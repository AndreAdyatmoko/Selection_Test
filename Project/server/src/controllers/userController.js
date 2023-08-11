const db = require('../../models');
const User = db.User;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

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
          message: "Periksa kembali email atau passwordmu ya 😉",
        });
      }

      // Verifikasi password (tanpa hash) - hanya perbandingan langsung
      if (password !== checkLogin.password) {
        return res.status(400).json({
          message: "Periksa kembali email atau passwordmu ya 😉",
        });
      }

      // Jika email dan password valid
      // Lakukan tindakan yang diperlukan, seperti menghasilkan token JWT
      
      // Tambahkan respons berhasil
      return res.status(200).json({
        message: "Berhasil login!",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Terjadi kesalahan pada server",
      });
    }
  },
};

module.exports = userController;
