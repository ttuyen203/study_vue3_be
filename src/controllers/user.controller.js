import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async getAllUser(req, res) {
    try {
      const users = await User.find({});

      if (users.length === 0) {
        return res.status(404).json({
          message: "Không có dữ liệu",
        });
      }

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getDetailUser(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email đã được đăng ký",
        });
      }

      const hashPassword = await bcryptjs.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
      });

      return res.status(201).json({ newUser });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email chưa được đăng ký",
        });
      }

      const isPassword = await bcryptjs.compare(password, user.password);
      if (!isPassword) {
        return res.status(400).json({
          message: "Mật khẩu không chính xác",
        });
      }

      const accessToken = jwt.sign({ userId: user._id }, "key", {
        expiresIn: "1h",
      });

      const userInfo = {
        email: user.email,
        userId: user._id,
      };

      return res.status(200).json({
        accessToken,
        userInfo,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }

      return res.status(200).json({
        message: "Xóa thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default UserController;
