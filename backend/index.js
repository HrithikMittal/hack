var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const vision = require("@google-cloud/vision");
var app = express();

app.use(bodyParser({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());

async function detectText(fileName) {
  const data = {
    requests: [
      {
        image: {
          content: fileName,
        },
        features: [
          {
            type: "TEXT_DETECTION",
            maxResults: 1,
          },
        ],
      },
    ],
  };

  try {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(data);

    const detections = result.textAnnotations;
    return detections[0].description;
  } catch (err) {
    return err;
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
