const { Storage } = require("../repositories");

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
  const fileRef = Storage.child(fileName);
  const snapshot = await fileRef.put(file.buffer, {
    contentType: file.mimetype,
  });
  const src = await snapshot.ref.getDownloadURL();
  return { src };
}

async function deleteFile(req, res) {
  //   const fileName = src.split("?")[0].split("/o/")[1].replace("%2F", "/");
  const { fileName } = req.params;
  const fileRef = Storage.child(fileName);
  await fileRef.delete();
  res.status(204).end();
}
