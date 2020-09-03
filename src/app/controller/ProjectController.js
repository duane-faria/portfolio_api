const models = require('../model');
const { toDate, format } = require('date-fns');
const pt = require('date-fns/locale/pt');
const fs = require('fs');
const { resolve } = require('path');
class ProjectController {
  async index(req, res) {
    const projects = await models.Projects.findAll({
      order: ['date'],
      include: [
        {
          model: models.Files,
          attributes: ['name', 'path', 'star'],
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
          file.dataValues.url = `${process.env.APP_URL}/files/${project.folder_name}/${file.path}`;
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

    if (Array.isArray(technologies)) {
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
    } else if (technologies) {
      let existsTag = await models.Technologies.findOne({
        where: {
          name: technologies.toLowerCase(),
        },
      });

      if (existsTag) {
        await models.ProjectsTechnologies.create({
          project_id: project.id,
          technologie_id: existsTag.id,
        });
        return;
      }

      let newTag = await models.Technologies.create({ name: technologies });

      await models.ProjectsTechnologies.create({
        project_id: project.id,
        technologie_id: newTag.id,
      });
    }

    return res.json(project);
  }

  async update(req, res) {
    req.body.date = toDate(Number(req.body.date));
    let { Technologies: technologies, indexFileStar, id, Files } = req.body;

    const project = await models.Projects.update(req.body, {
      where: {
        id,
      },
    });

    if (Files) {
      Files.forEach(async (file, index) => {
        let { name, path } = file;

        let existsFile = await models.Files.findOne({ where: { path } });

        let obj = { name, path, project_id: id, star: false };

        if (Number(indexFileStar) === index) {
          obj.star = true;
        }

        if (existsFile) {
          await models.Files.update(obj, {
            where: {
              name,
              path,
              project_id: id,
            },
          });
          return;
        }

        await models.Files.create(obj);
      });
    }

    // if (!Array.isArray(technologies)) {
    //   let newTag = await models.Technologies.update({ name: tec });
    // }
    let tagsAlreadyInserted = await models.ProjectsTechnologies.findAll({
      where: {
        project_id: id,
      },
    });

    let tagOk = false;

    tagsAlreadyInserted.forEach((tagAlIns) => {
      technologies.forEach((newTags) => {
        if (tagAlIns.technologie_id === Number(newTags.id)) {
          tagOk = true;
        }
      });
      if (!tagOk) {
        models.ProjectsTechnologies.destroy({
          where: { technologie_id: tagAlIns.technologie_id, project_id: id },
        });
      }
      tagOk = false;
    });

    technologies.forEach(async (tec) => {
      try {
        let existsTag = await models.Technologies.findOne({
          where: {
            name: tec.text,
          },
        });

        if (existsTag) {
          let isCadastred = await models.ProjectsTechnologies.findOne({
            where: {
              project_id: id,
              technologie_id: existsTag.id,
            },
          });
          if (!isCadastred) {
            await models.ProjectsTechnologies.create({
              project_id: id,
              technologie_id: existsTag.id,
            });
          }
          return;
        }

        let newTag = await models.Technologies.create({ name: tec.text });

        await models.ProjectsTechnologies.create({
          project_id: id,
          technologie_id: newTag.id,
        });
      } catch (e) {
        console.log(e);
      }
    });

    return res.json(project);
  }

  async delete(req, res) {
    const { id } = req.params;
    const project = await models.Projects.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      return res.json({ error: 'Project does not exists' });
    }

    const dir = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'files',
      'uploads',
      project.folder_name
    );

    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });

    models.Files.destroy({ where: { project_id: id } });
    models.ProjectsTechnologies.destroy({ where: { project_id: id } });
    models.Projects.destroy({ where: { id } });
    return res.json(id);
  }
}

module.exports = new ProjectController();
