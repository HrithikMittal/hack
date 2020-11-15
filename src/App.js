import React, { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./App.css";
import axios from "axios";

function App() {
  const [cameraOn, setCameraOn] = useState(true);

  const handleTakePhoto = (dataUri) => {
    setCameraOn(false);
    console.log(dataUri);
    var data = {
      content: dataUri.slice(23),
    };
    console.log(data);
    axios
      .post(`http://localhost:4000/text`, {
        data,
      })
      .then((res) => {
        console.log("RESPONSE:", res);
      })
      .catch((err) => {
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
        <button
          onClick={() => {
            setCameraOn(true);
          }}
        >
          Want To Take Again!
        </button>
      )}
    </div>
  );
}

export default App;
