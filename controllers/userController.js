// controllers/userController.js
const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.createUser(username, password);
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/all', async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  


module.exports = router;