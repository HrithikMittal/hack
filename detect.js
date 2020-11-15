async function detectText(fileName) {
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log(detections[0].description);
}

require(`yargs`) // eslint-disable-line
  .demand(1)

  .command(
    "text <fileName>",
    "Detects text in a local image file.",
    {},
    (opts) => {
      console.log(opts);
      detectText(opts.fileName);
    }
  ).argv;
