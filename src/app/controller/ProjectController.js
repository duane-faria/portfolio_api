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
        // console.log(tec);
        // tec = Number(tec);
        // await models.ProjectsTechnologies.create({
        //   project_id: project.id,
        //   tecnologie_id: tec,
        // });
        await models.Technologies.create({ name: tec });
      } catch (e) {
        console.log(e);
      }
    });

    return res.json(project);
  }

  async update() {}

  async delete() {}
}

module.exports = new ProjectController();
