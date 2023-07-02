require("firebase/storage"); // must be required for this to work
global.XMLHttpRequest = require("xhr2"); // must be used to avoid bug
const { getFirebase } = require("../repositories");

const uploadfile = async (req, res) => {
  const app = getFirebase();
  const storage = app.storage().ref(); // create a reference to storage
  try {
    const file = req.file;
    const timestamp = Date.now();
    const [name, type] = file.originalname.split(".");
    const fileName = `images/${name}_${timestamp}.${type}`;
    const fileRef = storage.child(fileName);
    const snapshot = await fileRef.put(file.buffer, {
      contentType: file.mimetype,
    });
    const src = await snapshot.ref.getDownloadURL();

    res.status(200).json({ src });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadfile,
};
