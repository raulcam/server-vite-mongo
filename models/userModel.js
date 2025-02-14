const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: String,
  password: {
    type: String,
    require: true,
  },
  phone: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  permissions: [{
    view: Boolean,
    update: Boolean,
    create: Boolean,
    delete: Boolean,
  }],
  isUser: Boolean,
  createAt: String,
  updateAt: String,
});

userSchema.pre("findOneAndDelete", function (next) {
  if (
    this.getQuery().role === "superadmin" ||
    this.getQuery().role === "admin"
  ) {
    const error = new Error("No se puede eliminar al usuario superadmin.");
    return next(error);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports = model('User', UserShema);
