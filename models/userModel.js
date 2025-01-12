const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: String,
  password: {
    type: String,
    require: true
  },
  phone: String,
  email: {
    type: String,
    require: true,
    unique: true
  },
  status: {
    type: Number,
    default: 0
  },
  isUser: Boolean,
  createAt: String,
  updateAt: String,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports = model('User', UserShema);