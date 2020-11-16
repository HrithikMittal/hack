import React, { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./App.css";
import axios from "axios";

function App() {
  const [cameraOn, setCameraOn] = useState(true);
  const [result, setResult] = useState("");

  const handleTakePhoto = (dataUri) => {
    setCameraOn(false);
    console.log(dataUri);
    var data = {
      content: dataUri,
    };
    console.log(data);
    axios
      .post(`http://localhost:4000/text`, {
        data,
      })
      .then((res) => {
        setResult(JSON.stringify(res));
        console.log("RESPONSE:", res);
      })
      .catch((err) => {
        setResult(JSON.stringify(err));
        console.log("ERROR:", err);
      });
  };

  return (
    <div className="App">
      {cameraOn && (
        <Camera
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      )}
      {!cameraOn && (
        <>
          <p>{result}</p>
          <button
            onClick={() => {
              setCameraOn(true);
            }}
          >
            Want To Take Again!
          </button>
        </>
      )}
    </div>
  );
}

export default App;
