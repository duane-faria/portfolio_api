const models = require('../model');
const { toDate } = require('date-fns');
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
          model: models.Tecnologies,
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
    });

    res.json(projects);
  }

  async store(req, res) {
    req.body.date = toDate(Number(req.body.date));
    let { tecnologies } = req.body;
    const project = await models.Projects.create(req.body);

    req.files.forEach(async (file) => {
      let { originalname: name, filename: path } = file;
      await models.Files.create({
        name,
        path,
        project_id: project.id,
      });
    });

    tecnologies.forEach(async (tec) => {
      try {
        console.log(tec);
        tec = Number(tec);
        await models.ProjectsTecnologies.create({
          project_id: project.id,
          tecnologie_id: tec,
        });
      } catch (e) {
        console.log(e);
      }
    });

    return res.json(req.body);
  }

  async update() {}

  async delete() {}
}

module.exports = new ProjectController();
