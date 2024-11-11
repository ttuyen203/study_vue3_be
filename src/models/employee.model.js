import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    images: {
      type: String,
    },
    birthdate: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    salary: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Employee", employeeSchema);
