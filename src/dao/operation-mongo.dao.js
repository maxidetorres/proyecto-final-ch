const createConnectionMongoDb  = require('../db/mongo/connection').createConnectionMongoDb()

exports.getAll = async (model) => {
  try {
   return await model.find({})
  }catch(er){
    console.log(er)
    throw er
  }
}
exports.save = async (model, object) => {
  try {
    console.log('COLLECTION', model)
    console.log("producto", object)
    const objectCollection = new model(object)
    console.log('OBJECT COLLECTION 0',objectCollection)
   return await objectCollection.save()
  }catch(er){
    console.log(er)
    throw er
  }
}


exports.getById = async (model, id) => {
  try {
    return await model.findOne({ _id: id })
   }catch(er){
     console.log(er)
     throw er
   }
}

exports.updateByFilter = async (model, filter, object) => {
  try{
    return await model.findOneAndUpdate(filter, object, {
      new: true
    });
  }catch(e){
    console.log("error updatte", e)
    throw e
  }
  
}

exports.deleteById = async (model, id) => {
  try{
    const res = await model.deleteOne({ _id: id });
    // `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ id: ... }`
   return res;
  }catch(e){
    console.log("error delete", e)
    throw e
  }
}

