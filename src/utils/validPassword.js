const bcrypt = require('bcryptjs')

exports.validPassword = async (password, userPassword) => {
  return await bcrypt.compareSync(password, userPassword)
}
