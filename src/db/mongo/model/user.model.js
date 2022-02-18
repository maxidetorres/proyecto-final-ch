const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  age: { type: Number },
  phone: { type: String },
  pathImage: { type: String },
  createdDate: { type: Date, default: Date.now }
})

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.password
  }
})
module.exports = mongoose.model('User', UserSchema)
