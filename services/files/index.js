const { Storage } = require("../../adapters/firebase");

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

async function deleteFile(req, res) {
  const { fileName } = req.params;
  await Storage.file(fileName).delete();
  res.status(204).end();
}

async function uploadFile(file) {
  const timestamp = Date.now();
  const [name, type] = file.originalname.split(".");
  const fileName = `images/${name}_${timestamp}.${type}`;
  await Storage.file(fileName).save(file.buffer, {
    contentType: file.mimetype,
  });
  const src = createImageUrl(fileName);
  return { src };
}

function createImageUrl(fileName) {
  const [_, bucket] = process.env.STORAGE_BUCKET.split("//");
  const filePath = encodeURIComponent(fileName);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${filePath}?alt=media`;
}
