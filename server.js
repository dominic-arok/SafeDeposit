require("dotenv").config()
const multer = require("multer")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const File = require("./models/File")

const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true}))

const upload = multer( { dest: "uploads" })

mongoose.connect(process.env.DATABASE_URL)

app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    const fileId = req.query.fileId;
  
    if (!fileId) return res.render("index");
  
    try {
      const file = await File.findById(fileId);
      if (!file) return res.render("index");
  
      const fileLink = `${req.protocol}://${req.get("host")}/file/${file.id}`;
      res.render("index", { fileLink });
    } catch (err) {
      console.error(err);
      res.render("index");
    }
  });

app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
  
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname,
    };
  
    if (req.body.password && req.body.password !== "") {
      const bcrypt = require("bcryptjs");
      fileData.password = await bcrypt.hash(req.body.password, 10);
    }
  
    const file = await File.create(fileData);
    res.redirect(`/?fileId=${file.id}`);
});

app.get("/success/:id", async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) return res.send("File not found.");
  
    const fileLink = `${req.protocol}://${req.get("host")}/file/${file.id}`;
    res.render("index", { fileLink });
  });

app.route("/file/:id").get(handleDownload).post(handleDownload)

async function handleDownload(req, res) {
    const file = await File.findById(req.params.id)

    if (file.password != null) {
        if (req.body.password == null) {
            res.render("password")
            return
        }

        if (!(await bcrypt.compare(req.body.password, file.password))) {
            res.render("password", { error: true })
            return
        }
    }

    file.downloadCount++
    await file.save()
    console.log(file.downloadCount)
    res.download(file.path, file.originalName)
}

app.listen(process.env.PORT)