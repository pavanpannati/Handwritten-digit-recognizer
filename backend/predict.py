import cv2 as cv
import numpy as np
import tensorflow as tf

# Load the model
model = tf.keras.models.load_model("handwritten_model.keras")

# defining functions for resizing img
def resize_and_pad(roi):
    
    # aspect ratio 20*20
    h, w = roi.shape
    if h > w:
        new_h = 20
        new_w = int(w * (20 / h))
    else:
        new_w = 20
        new_h = int(h * (20 / w))

    resized = cv.resize(roi, (new_w, new_h))
    
    # 28x28 black image and paste resized digit at center
    padded = np.zeros((28, 28), dtype=np.uint8)
    x_offset = (28 - new_w) // 2
    y_offset = (28 - new_h) // 2
    padded[y_offset:y_offset + new_h, x_offset:x_offset + new_w] = resized

    return padded

def split_and_predict_digits(image_path):
    img = cv.imread(image_path)
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    _, thresh = cv.threshold(gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
    
    contours, _ = cv.findContours(thresh, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

    sorted_contours = sorted(contours, key=lambda c: cv.boundingRect(c)[0])

    predictions = []

    for contour in sorted_contours:
        x, y, w, h = cv.boundingRect(contour)
        if w > 10 and h > 10:
            roi = thresh[y:y+h, x:x+w]

            roi = resize_and_pad(roi)

            roi = roi.astype('float32') / 255.0
            roi = roi.reshape(1, 28, 28, 1)

            pred = model.predict(roi,verbose=0)
            digit = np.argmax(pred)
            predictions.append(digit)

    return [int(d) for d in predictions]
