"use strict";

async function detectText(fileName) {
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log(detections[0].description);
}

async function detectFulltext(fileName) {
  // [START vision_fulltext_detection]

  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Read a local image as a text document
  const [result] = await client.documentTextDetection(fileName);
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log(`Full text: ${fullTextAnnotation.text}`);
  fullTextAnnotation.pages.forEach((page) => {
    page.blocks.forEach((block) => {
      console.log(`Block confidence: ${block.confidence}`);
      block.paragraphs.forEach((paragraph) => {
        console.log(`Paragraph confidence: ${paragraph.confidence}`);
        paragraph.words.forEach((word) => {
          const wordText = word.symbols.map((s) => s.text).join("");
          console.log(`Word text: ${wordText}`);
          console.log(`Word confidence: ${word.confidence}`);
          word.symbols.forEach((symbol) => {
            console.log(`Symbol text: ${symbol.text}`);
            console.log(`Symbol confidence: ${symbol.confidence}`);
          });
        });
      });
    });
  });
  // [END vision_fulltext_detection]
}

require(`yargs`) // eslint-disable-line
  .demand(1)

  .command(
    "text <fileName>",
    "Detects text in a local image file.",
    {},
    (opts) => detectText(opts.fileName)
  )
  .command(
    "fulltext <fileName>",
    "Extracts full text from a local image file.",
    {},
    (opts) => detectFulltext(opts.fileName)
  )
  .wrap(120)
  .recommendCommands()
  .epilogue("For more information, see https://cloud.google.com/vision/docs")
  .help()
  .strict().argv;
