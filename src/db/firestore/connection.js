// FIREBASE ADMIN
const admin = require('firebase-admin');

const serviceAccount = require('../../../ch-nodejs-firebase-adminsdk-1z3r4-9798a24cb9.json');

//CONFIG ADMIN se utiliza las credenciales para acceder a la bd de firebase
module.exports.createConnectionFirebase = async () =>{
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}


