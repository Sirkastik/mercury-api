require("firebase/storage"); // must be required for this to work
global.XMLHttpRequest = require("xhr2"); // must be used to avoid bug
const { getFirebase } = require("../repositories");
const app = getFirebase();
const storage = app.storage().ref(); // create a reference to storage

module.exports = {
  uploadSingle,
  uploadMultiple,
  deleteFile,
};

async function uploadSingle(req, res) {
  const image = await uploadFile(req.file);

  res.status(200).json(image);
}

async function uploadMultiple(req, res) {
  const images = await Promise.all(req.files.map(uploadFile));

  res.status(200).json(images);
}

async function uploadFile(file) {
  const timestamp = Date.now();
  const [name, type] = file.originalname.split(".");
  const fileName = `images/${name}_${timestamp}.${type}`;
  const fileRef = storage.child(fileName);
  const snapshot = await fileRef.put(file.buffer, {
    contentType: file.mimetype,
  });
  const src = await snapshot.ref.getDownloadURL();
  return { src }
}

async function deleteFile(fileName) {
  const fileRef = storage.child(fileName);
  await fileRef.delete();
}
