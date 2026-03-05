import tensorflow as tf
import numpy as np

# Fake dataset (replace with real dataset later)
X = np.random.rand(200, 224, 224, 3)
y = tf.keras.utils.to_categorical(
    np.random.randint(0,3,200), 3
)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(224,224,3)),
    tf.keras.layers.Conv2D(16,(3,3),activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(32,activation='relu'),
    tf.keras.layers.Dense(3,activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(X,y,epochs=3)

model.save("ventura_model.h5")