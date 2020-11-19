const User = require('./../models/user.model');
const users = {};

// Método get de usuarios
users.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // const user = await User.findById("5fb544c349ac663a42de0b6e");
    // const user = await User.findOne({email: "omar.salas@jynsystems.com"});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({error: 'No se pudieron obtener los usuarios'});
  }
};

users.createUser = async (req, res) => {
  let body = req.body;
  // En body solo se envia email y password
  body = {
    ...body, 
    age: 26,
    gender: 'male'
  };

  try {
    const user = new User(body);
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

users.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.deleteOne({ _id: userId });
    res.json({success: 'El usuario se elimino correctamente.'});
  } catch (error) {
    console.log(error);
    res.status(404).json({error: 'El cliente no existe.'});
  }

  /* const index = usersData.findIndex((user) => user.id === +userId);
  if (index === -1) {
    res.status(400).send({error: 'Usuario no encontrado'});
  } else {
    usersData.splice(index, 1);
    res.json({message: 'Usuario eliminado'});
  } */
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