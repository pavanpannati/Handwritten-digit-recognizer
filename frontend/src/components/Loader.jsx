import React from "react";
import { Circles } from "react-loading-icons";

function Loader() {
  return (
    <div className="flex items-center justify-center h-full w-full absolute inset-0 bg-black/50 z-50">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
  );
}

export default Loader;
