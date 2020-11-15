var express = require("express");
const vision = require("@google-cloud/vision");
var app = express();

async function detectText(fileName) {
  console.log("FILE NAME:", fileName);
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  return detections[0].description;
}

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/text", async (req, res) => {
  const data = await detectText("../solveshot2.5047d2ce3456.png");
  res.json(data);
});

app.listen(4000, () => {
  console.log("PORT is server is listening on:", 4000);
});
