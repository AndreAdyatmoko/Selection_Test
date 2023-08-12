const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');
const User = db.User;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { sendInvitationEmail } = require('../helper/emailHelper');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role
  };
  const options = {
    expiresIn: '2h',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const userController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkLogin = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!checkLogin) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
      const passwordMatches = await bcrypt.compare(password, checkLogin.password);
      if (!passwordMatches) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
      const token = generateToken(checkLogin);
      return res.status(200).json({
        message: "Login successful!",
        token: token,
        roleId: checkLogin.roleId,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occurred on the server",
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { email, password, fullname, birthdate, joinDate } = req.body;
      const existingUser = await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { email: email },
            { fullname: fullname }
          ]
        }
      })
      if(existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.sequelize.transaction(async (t) => {
        const newUser = await User.create({
          email: email,
          password: hashedPassword,
          fullname: fullname,
          birthdate: birthdate,
          joinDate: joinDate,
          roleId: 2,
        }, { transaction: t });

        const payload = {
          id: newUser.id,
          role: newUser.roleId
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        const redirect = `http://localhost:3000/change-identity/${token}`;;
        sendInvitationEmail(email, redirect);

        return res.status(201).json({
          message: 'User created successfully, please check your email!',
          user: newUser,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An error occurred on the server',
      });
    }
  },

  sendEmail: async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
      const { id } = req.params;
      if (usedTokens.has(token)) {
        return res.status(400).json({
          message: 'Token already used',
        });
      }
      usedTokens.add(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id === id) {
        return res.status(200).json({
          message: 'Token valid',
        });
      }
      return res.status(400).json({
        message: 'Token invalid',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An error occurred on the server',
      });
    }
  },

  changeIdentity: async (req, res) => {
    try {
      const { id } = req.user;
      const { password, fullname, birthdate } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      if (password) {
        const hashedNewPassword = await bcrypt.hash(password, 10);
        user.password = hashedNewPassword;
      }
      if (fullname) {
        user.fullname = fullname;
      }
      if (birthdate) {
        user.birthdate = new Date(birthdate);
      }
      await user.save();
      return res.status(200).json({
        message: 'Identity changes successfully saved',
        user: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An error occurred on the server',
      });
    }
  },
};

module.exports = userController;
