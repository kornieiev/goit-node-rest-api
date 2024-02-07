const multer = require("multer");
const path = require("path");

// const Jimp = require("jimp");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    // Jimp.read(file, (err, avatar) => {
    //   if (err) throw err;
    //   avatar.resize(256, 256);
    // });
    // console.log("file-multerConfig-upload:", file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
