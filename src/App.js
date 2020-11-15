import React, { useState } from "react";
import { createWorker } from "tesseract.js";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
// import vision from "react-cloud-vision-api";
import vision from "@google-cloud/vision";
import "react-html5-camera-photo/build/css/index.css";
import Key from "./august-monument-295713-9d959a5eb2a8.json";
import "./App.css";

function App() {
  const googleVision = async (link) => {
    // vision.init({ auth: "AIzaSyDHUEKaBC_nzmwMwVjRncvHbv_nXulyziA" });
    try {
      const client = new vision.ImageAnnotatorClient();
    } catch (error) {
      console.log("ERROR:", error);
    }
    // console.log("CLOENT:", client);
    // const fileName = link;

    // const [result] = await client.documentTextDetection(fileName);
    // const fullTextAnnotation = result.fullTextAnnotation;
    // console.log(fullTextAnnotation);
  };

  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  const doOCR = async (link) => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(link);
    setOcr(text);
  };
  const [ocr, setOcr] = useState("Recognizing...");
  const [cameraOn, setCameraOn] = useState(true);

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    setCameraOn(false);
    console.log("takePhoto", dataUri);
    googleVision(dataUri);
  };

  return (
    <div className="App">
      <p>{ocr}</p>
      {cameraOn && (
        <Camera
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      )}
    </div>
  );
}

export default App;
