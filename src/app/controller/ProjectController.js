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

    projects.forEach((project) => {
      project.Files.forEach((file) => {
        file.dataValues.url = `http://localhost:3000/files/${project.folder_name}/${file.path}`;
      });
      project.dataValues.dateClean = project.date;
      project.dataValues.date = format(project.date, `dd MMM yyyy`, {
        locale: pt,
      });
    });

    res.json(projects);
  }

  async store(req, res) {
    req.body.date = toDate(Number(req.body.date));
    let { technologies } = req.body;
    const project = await models.Projects.create(req.body);

    req.files.forEach(async (file) => {
      let { originalname: name, filename: path } = file;
      await models.Files.create({
        name,
        path,
        project_id: project.id,
      });
    });

    // technologies.forEach(async (tec) => {
    //   try {
    //     console.log(tec);
    //     tec = Number(tec);
    //     await models.ProjectsTechnologies.create({
    //       project_id: project.id,
    //       tecnologie_id: tec,
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });

    return res.json(project);
  }

  async update() {}

  async delete() {}
}

module.exports = new ProjectController();
