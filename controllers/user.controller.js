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

module.exports = users;