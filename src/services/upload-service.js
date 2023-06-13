const cloudinary = require("../config/cloudinary");
exports.upload = (path) => cloudinary.uploader.upload(path); //ระบุตำแหน่งที่เก็บไฟล์ไว้
