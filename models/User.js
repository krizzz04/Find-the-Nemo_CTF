const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    completedLevels: {
      type: Object,
      default: {}
    }
  });
  
  UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
  });
  
  UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  module.exports = mongoose.model('User', UserSchema);