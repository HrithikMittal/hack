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
    }; // https://dashboard.heroku.com
    axios
      .post(`https://d96a5935ee51.ngrok.io/text`, {
        data,
      })
      .then((res) => {
        setResult(res);
        console.log("RESPONSE:", res);
      })
      .catch((err) => {
        setResult(err);
        console.log("ERROR:", err);
      });
  };

  return (
    <div className="App">
            
      {result !== "" && result.data === true && (
        <div class="alert alert-success">
                    <strong>YES!</strong> Your equation is correct!         
        </div>
      )}
            
      {result !== "" && result.data !== true && (
        <div class="alert alert-danger">
                    <strong>No!</strong> Your Equation if not correct please
          send the           image again.         
        </div>
      )}
            
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
                    {/* <p>{result}</p> */}
                    
          <button
            onClick={() => {
              setCameraOn(true);
              setResult("");
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
