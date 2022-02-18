const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../db/mongo/model/user.model')
const { validPassword } = require('./validPassword')

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
}

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username })
    if (!user) {
      return done(null, false)
    }

    const isValid = await validPassword(password, user.password)
    if (isValid) {
      const resultUser = { ...user.toJSON() }
      console.log(resultUser)
      return done(null, { ...user.toJSON() })
    } else {
      return done(null, false)
    }
  } catch (error) {
    return done(error)
  }
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      done(null, false)
    } else {
      done(null, { ...user.toJSON() })
    }
  } catch (error) {
    done(error)
  }
})
