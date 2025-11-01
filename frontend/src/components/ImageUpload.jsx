import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setResult([]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please choose an image first!");

    const formData = new FormData();
    formData.append("data", image);

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.result);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-center w-[400px] sm:w-[800px]">
      <h1 className="text-4xl font-bold mb-4 text-gray-200">Handwritten Digit Predictor</h1>

      <input type="file" 
      accept="image/*" 
      onChange={handleFileChange} 
      multiple 
      id="fileinput"
      className="text-gray-100" />

      
      <button
        disabled={loading}
        onClick={handleUpload}
        className={`${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all`}
        >
        {loading ? 
        < div className="flex items-center gap-2">
          <Loader/>
        Predicting...
        </div > : "Upload & Predict"}
      </button>
      {image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-40 mx-auto rounded-lg shadow"
          />
        </div>
      )}
      {loading ? (
        <div>
          <Loader/>
        </div>
      ):( 
      result.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold text-zinc-500">Predicted Digits:</h2>
          <p className="text-lg mt-2 text-blue-100">{result.join("")}</p>
        </div>
      )
    )}
    </div>
  );
}

export default ImageUpload;
