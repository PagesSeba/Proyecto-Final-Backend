import express from "express";
import multer from "multer";
import { logger } from "./src/utils/logger.js";
const upload = multer({
  dest: "uploads/",
});

app.post("/profile", upload.single("avatar"), (req, res) => {
  console.log(req.file);
  res.send();
});

app.post("/photos/upload.js", upload.array("photos", 12), (req, res) => {
  console.log(req.files);
  res.send();
});

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);

app.post("/cool-profile", cpUpload, (req, res) => {
  console.log(req.files);
  res.send();
});