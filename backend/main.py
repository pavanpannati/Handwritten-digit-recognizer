from fastapi import FastAPI, HTTPException,File, UploadFile
from pydantic import BaseModel
from predict import split_and_predict_digits
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os 

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your React URL e.g. ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(data:UploadFile = File(...)):
    try:
        upload_dir = "uploaded_images"
        os.makedirs(upload_dir, exist_ok=True)


        file_path = os.path.join(upload_dir, data.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(data.file, buffer)

        result = split_and_predict_digits(file_path)

        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
