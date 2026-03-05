from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- LOAD MODEL ----------------

def load_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(224,224,3)),
        tf.keras.layers.Conv2D(16, (3,3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2,2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(3, activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy'
    )

    return model

model = load_model()

# ---------------- PREPROCESS FUNCTION ----------------

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224,224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# ---------------- DATA MODELS ----------------

class CompatibilityRequest(BaseModel):
    activity: str
    kids: bool
    living_space: str
    pet_energy: str
    pet_temperament: str

class ConciergeRequest(BaseModel):
    message: str

class ReturnRiskRequest(BaseModel):
    compatibility_score: int

# ---------------- ROUTES ----------------

@app.post("/compatibility")
def compatibility(data: CompatibilityRequest):
    score = 50

    if data.activity == data.pet_energy:
        score += 20
    else:
        score -= 10

    if data.kids and data.pet_temperament == "friendly":
        score += 15

    if data.living_space == "house" and data.pet_energy == "high":
        score += 10

    score = max(1, min(100, score))
    return {"compatibility_score": score}

@app.post("/concierge")
def concierge(data: ConciergeRequest):
    message = data.message.lower()

    if "not eating" in message:
        response = "It’s normal during adjustment. Try small portions 🐾"
    elif "barking" in message:
        response = "Your pet may feel anxious. Provide comfort."
    else:
        response = "Your pet is adjusting normally 🐶"

    return {"response": response}

@app.post("/return-risk")
def return_risk(data: ReturnRiskRequest):
    risk = "Low"
    if data.compatibility_score < 60:
        risk = "High"

    return {
        "return_risk": risk,
        "estimated_reduction": "60%"
    }

# ---------------- ML IMAGE ROUTES ----------------

@app.post("/vision-diagnostics")
async def vision_diagnostics(file: UploadFile = File(...)):
    contents = await file.read()
    processed = preprocess_image(contents)

    predictions = model.predict(processed)
    confidence = float(np.max(predictions))

    labels = ["Normal", "Minor Issue", "Severe Issue"]
    predicted_class = labels[np.argmax(predictions)]

    return {
        "diagnosis": predicted_class,
        "confidence_score": round(confidence * 100, 2)
    }

@app.post("/pain-detection")
async def pain_detection(file: UploadFile = File(...)):
    contents = await file.read()
    processed = preprocess_image(contents)

    predictions = model.predict(processed)
    confidence = float(np.max(predictions))

    return {
        "pain_probability": f"{round(confidence * 100, 2)}%",
        "confidence_score": round(confidence * 100, 2)
    }