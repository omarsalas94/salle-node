const User = require('./../models/user.model');
const users = {};

const usersData = [
    {
      id: 1,
      email: 'omar.salas@jynsystems.com',
      password: '123',
      role: 'teacher',
    },
    {
      id: 2,
      email: 'andres@jynsystems.com',
      password: '123',
      role: 'student',
    },
    {
      id: 3,
      email: 'luis@jynsystems.com',
      password: '123',
      role: 'student',
    },
    {
      id: 4,
      email: 'felix@jynsystems.com',
      password: '123',
      role: 'teacher',
    },
    {
      id: 5,
      email: 'daniel@jynsystems.com',
      password: '123',
      role: 'teacher',
    },
  ];

users.getAllUsers = (req, res) => {
    res.json(usersData);
};

users.createUser = async (req, res) => {
  const body = req.body;

  try {
    const user = new User({
      name: "Omar",
      lastName: "Salas",
      age: 26,
      birth: new Date().toISOString(),
    });
  
    await user.save();
  
    res.json(user);
  } catch (error) {
    res.json({ error });
  }
  

  /* // Validación de campos requeridos
  if (!body.email || !body.password || !body.role) {
    res.status(400).send('Ingresa todas las propiedades');
  }

  const userFound = usersData.find((user) => user.email === body.email);
  console.log(userFound);
  if (userFound) {
    res.status(400).send('El usuario ya esta registrado');
  } else {
    const user = {
      email: body.email,
      password: body.password,
      role: body.role,
      id: usersData[usersData.length -1].id + 1,
    };
    usersData.push(user);
    res.json(user);
  } */
}

users.deleteUser = (req, res) => {
  const { userId } = req.params;
  const index = usersData.findIndex((user) => user.id === +userId);
  if (index === -1) {
    res.status(400).send({error: 'Usuario no encontrado'});
  } else {
    usersData.splice(index, 1);
    res.json({message: 'Usuario eliminado'});
  }
}

users.updateUser = (req, res) => {
  const { userId } = req.params;
  const body = req.body;

  const index = usersData.findIndex((user) => user.id === +userId);
  if (index === -1) {
    res.status(400).send({error: 'Usuario no encontrado'});
  } else {
    const user = {
      ...usersData[index],
      ...body,
    };
    usersData[index] = user;
    res.json(user);
  }
  
}


module.exports = users;