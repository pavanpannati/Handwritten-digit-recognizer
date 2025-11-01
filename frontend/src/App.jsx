import React from "react";
import ImageUpload from "./components/ImageUpload";
function App() {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-indigo-900 to-black">
    <div 
    className="min-h-screen flex items-center justify-center bg-[length:500px_500px] bg-center bg-no-repeat bg-[url('/brain.png')]"
    
  >
      <ImageUpload />
    </div>
    </div>
  );
}

export default App;
