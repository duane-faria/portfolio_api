const models = require('../model');
const { toDate, format } = require('date-fns');
const pt = require('date-fns/locale/pt');

class ProjectController {
  async index(req, res) {
    const projects = await models.Projects.findAll({
      order: ['date'],
      include: [
        {
          model: models.Files,
          attributes: ['name', 'path'],
        },
        {
          model: models.Technologies,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ['id', 'name', 'description', 'date', 'link', 'folder_name'],
    });
    if (projects.length > 0) {
      projects.forEach((project) => {
        project.Files.forEach((file) => {
          file.dataValues.url = `http://localhost:3000/files/${project.folder_name}/${file.path}`;
        });
        project.dataValues.dateClean = project.date;
        project.dataValues.date = format(project.date, `dd MMM yyyy`, {
          locale: pt,
        });
      });
    }

    res.json(projects);
  }

  async store(req, res) {
    req.body.date = toDate(Number(req.body.date));
    let { technologies, indexFileStar } = req.body;
    const project = await models.Projects.create(req.body);

    req.files.forEach(async (file, index) => {
      let { originalname: name, filename: path } = file;

      let obj = { name, path, project_id: project.id };
      if (Number(indexFileStar) === index) {
        obj = { ...obj, star: true };
      }
      await models.Files.create(obj);
    });

    technologies.forEach(async (tec) => {
      try {
        let existsTag = await models.Technologies.findOne({
          where: {
            name: tec.toLowerCase(),
          },
        });

        if (existsTag) {
          await models.ProjectsTechnologies.create({
            project_id: project.id,
            technologie_id: existsTag.id,
          });
          return;
        }

        let newTag = await models.Technologies.create({ name: tec });

        await models.ProjectsTechnologies.create({
          project_id: project.id,
          technologie_id: newTag.id,
        });
      } catch (e) {
        console.log(e);
      }
    });

    return res.json(project);
  }

  async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;
    models.Files.destroy({ where: { project_id: id } });
    models.ProjectsTechnologies.destroy({ where: { project_id: id } });
    models.Projects.destroy({ where: { id } });
    return res.json(id);
  }
}

module.exports = new ProjectController();
