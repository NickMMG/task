const Router = require('express').Router();

const { employee, edication } = require('../db/models');

Router.get('/', async (req, res) => {
  try {
    const data = await employee.findAll({ include: edication }, { raw: true });
    res.json(data);
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

Router.post('/', async (req, res) => {
  try {
    const { nameLast, edicationText } = req.body.AddCard;
    const result = await edication.findOne(
      { where: { content: edicationText } },
      { raw: true }
    );
    const card = await employee.create({
      name: nameLast,
      edication_id: result.id,
    });

    const dataAll = await employee.findAll(
      { include: edication },
      { raw: true }
    );
    const data = dataAll.filter((el) => el.id === card.id);
    res.json(data[0]);
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

Router.delete('/:id', async (req, res) => {
  try {
    await employee.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: true });
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

Router.put('/:id/update-cards', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, edication_id } = req.body.changeEmployee;
    await employee.update({ name, edication_id }, { where: { id } });
    res.status(200).json();
  } catch (message) {
    console.error(message);
    res.status(500).json(message);
  }
});

module.exports = Router;
