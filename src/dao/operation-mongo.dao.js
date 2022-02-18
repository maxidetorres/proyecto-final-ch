const createConnectionMongoDb = require('../db/mongo/connection').createConnectionMongoDb()

exports.getAll = async (model) => {
  try {
    return await model.find({})
  } catch (er) {
    console.log(er)
    throw er
  }
}
exports.save = async (Model, object) => {
  try {
    const objectCollection = new Model(object)
    return await objectCollection.save()
  } catch (er) {
    console.log(er)
    throw er
  }
}

exports.getById = async (model, id) => {
  try {
    return await model.findOne({ _id: id })
  } catch (er) {
    console.log(er)
    throw er
  }
}

exports.getByFilter = async (model, filter) => {
  try {
    return await model.find(filter)
  } catch (er) {
    console.log(er)
    throw er
  }
}

exports.updateByFilter = async (model, filter, object) => {
  try {
    return await model.findOneAndUpdate(filter, object, {
      new: true
    })
  } catch (e) {
    console.log('error updatte', e)
    throw e
  }
}

exports.deleteById = async (model, id) => {
  try {
    const res = await model.deleteOne({ _id: id })
    // `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ id: ... }`
    return res
  } catch (e) {
    console.log('error delete', e)
    throw e
  }
}
