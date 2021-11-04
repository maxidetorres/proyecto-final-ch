const createConnectionFirebase = require('../db/firestore/connection').createConnectionFirebase()
const admin = require('firebase-admin');

const db = admin.firestore();

exports.getAll = async (collection) => {
    try {
     return await db.collection(collection).get()
    }catch(er){
      console.log(er)
    }
  }

  exports.save = async (collection, object) => {
    try {
     return await db.collection(collection).add(object)
    }catch(er){
      console.log(er)
    }
  }
  
  exports.getById = async (collection, id) => {
    try {
      return await db.collection(collection).doc(id).get()
     }catch(er){
       console.log(er)
     }
  }

  exports.updateByFilter = async (collection, id, object) => {
    try{
      return await db.collection(collection).doc(id).update(object)
    }catch(e){
      console.log("error updatte", e)
    }
  }

  exports.deleteById = async (collection, id) => {
    try{
      return await db.collection(collection).doc(id).delete()
    }catch(e){
      console.log("error delete", e)
    }
  }