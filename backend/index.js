const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const vision = require("@google-cloud/vision");
const base64ToImage = require("base64-to-image");
const fs = require("fs");

const app = express();

app.use(bodyParser({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());

async function detectText(fileName) {
  var imageInfo = base64ToImage(fileName, "./cluster/");
  const client = new vision.ImageAnnotatorClient();
  console.log(__dirname);
  const [result] = await client.textDetection(
    `${__dirname}/cluster/${imageInfo.fileName}`
  );
  try {
    fs.unlinkSync(`${__dirname}/cluster/${imageInfo.fileName}`);
  } catch (err) {
    console.log("ERROR IN REMOVING FILE:", err);
    return `Error in removing unnecessary files!`;
  }
  try {
    const detections = result.textAnnotations;
    return detections[0].description;
  } catch (err) {
    return `Sorry! Please input an text image! ${err}`;
  }
}

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/text", async (req, res) => {
  const file = req.body.data.content;
  const data = await detectText(file);
  res.json(data);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("PORT is server is listening on:", port);
});
