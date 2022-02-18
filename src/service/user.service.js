const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../db/mongo/model/user.model')
const logger = require('../logger').createLogger({ fileName: __filename })
const { sendMail } = require('./sendMail.service')
exports.register = async (req) => {
  const { email, password, firstName, lastName, phone, address, age } = req.body
  const pathImage = req.file.path
  // validate
  try {
    if (await User.findOne({ email })) {
      return {
        status: 400,
        message: `Email: ${email} ya esta registrado`
      }
    }
    const userOptions = {
      email,
      firstName,
      lastName,
      phone,
      address,
      age,
      pathImage: pathImage
    }
    const user = new User(userOptions)

    // hash password
    if (password) {
      user.password = bcrypt.hashSync(password, 10)
    }

    // save user
    const userSaved = await user.save()
    const subject = 'Nuevo usuario'
    const bodyMail = `<b>Se registro un nuevo usuario en la base de datos</b></br>
    <p>Nombre: ${user.firstName} </p>
    <p>Apellido: ${user.lastName} </p>
    <p>Email:${user.email} </p
    <p>Número de telefono: ${user.phone} </p>
    <p>Edad: ${user.age} </p>
    <p>Dirección: ${user.address} </p>`

    sendMail(subject, bodyMail)
    return {
      status: 201,
      message: 'Usuario registrado existosamente!!'
    }
  } catch (error) {
    console.log(error)
  }
}

exports.login = async (req) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ sub: user.id }, 'holahola', { expiresIn: '7d' })
      return {
        status: 200,
        ...user.toJSON(),
        token
      }
    } else {
      return {
        status: 404,
        errorMessage: 'Usuario y/o contraseña invalidos'
      }
    }
  } catch (error) {
    console.log(error)
  }
}
