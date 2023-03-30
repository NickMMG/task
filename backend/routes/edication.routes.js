const Router = require('express').Router();

const { edication, employee } = require('../db/models');

Router.get('/', async (req, res) => {
  try {
    const data = await edication.findAll({ raw: true });
    res.json(data);
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

Router.post('/', async (req, res) => {
  try {
    const data = await edication.create({ content: req.body.content });
    res.json(data);
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

Router.put('/:id/update-cards', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body.changeEdication;
    await edication.update({ content }, { where: { id } });
    res.status(200).json();
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

Router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const employeeAll = await employee.findAll({ raw: true });
    const data = employeeAll.find(
      (el) => Number(el.edication_id) === Number(id)
    );
    if (data === undefined) {
      await edication.destroy({
        where: {
          id,
        },
      });
      res.json({ message: true, id: id });
    } else {
      res.status(401).json({ error: 'nelzya' });
    }
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

module.exports = Router;
