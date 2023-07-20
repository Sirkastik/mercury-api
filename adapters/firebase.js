const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const app = initializeApp({
  credential: cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  storageBucket: process.env.STORAGE_BUCKET,
});

const Storage = getStorage(app).bucket();

module.exports = { Storage };
