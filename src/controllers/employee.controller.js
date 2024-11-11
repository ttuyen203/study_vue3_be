import Employee from "../models/employee.model.js";

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find({});
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async getEmployeeDetail(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async createEmployee(req, res) {
    try {
      const images = req.files
        ? req.files.map((file) => file.path)
        : req.body.images;

      const newData = {
        ...req.body,
        images,
      };

      const employee = await Employee.create(newData);

      return res.status(201).json(employee);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateEmployee(req, res) {
    try {
      const images = req.files
        ? req.files.map((file) => file.path)
        : req.body.images;

      const newData = {
        ...req.body,
        images,
      };

      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        newData,
        {
          new: true,
        }
      );

      if (!employee) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }

      return res.status(200).json(employee);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }
      return res.status(200).json({
        message: "Xóa thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default EmployeeController;
