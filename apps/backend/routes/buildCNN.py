from flask import Blueprint, jsonify, request
import numpy as np 
import keras
from keras.models import Sequential 
from keras.layers import Dense, Dropout, Flatten 
from keras.layers import Conv1D, MaxPooling1D
buildCNN = Blueprint('buildCNN', __name__)
@buildCNN.route("/buildCNN", methods = ['GET'])
def handler(): 
    #step 1. declare training variables 
    batchSize = 27 #set so that minibatch size is fixed to 50
    numClasses = 9 #number of classes from the dataset
    epochs = 16 
    trainingFeatures = np.load("./numpyArrays/trainingFeatures.npy")   
    trainingLabels = np.load("./numpyArrays/trainingLabels.npy")
    testingFeatures = np.load("./numpyArrays/testingFeatures.npy")
    testingLabels = np.load("./numpyArrays/testingLabels.npy")
    inputShape = (7, 1)
    #define model 
    model = Sequential()
    model.add(Conv1D(32, kernel_size = 3, activation = 'relu', input_shape = inputShape ))
    model.add(Conv1D(64, kernel_size = 3, activation = 'relu'))
    model.add(Conv1D(64, kernel_size = 3, activation = 'relu'))
    model.add(MaxPooling1D(pool_size = 2))
    model.add(Dropout(0.25))
   
    model.add(Flatten())
    model.add(Dense(512, activation ="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(numClasses, activation = "softmax"))
    model.compile(loss = keras.losses.categorical_crossentropy, optimizer = keras.optimizers.Adam(), metrics = ['accuracy'])
    train = model.fit(trainingFeatures, trainingLabels, batch_size = batchSize, epochs= epochs, verbose = 0, validation_data = (testingFeatures[:160], testingLabels[:160]))
    score = model.evaluate(testingFeatures[160:], testingLabels[160:])
    print("Accuracy:", score[1])
    return jsonify({"accuracy": score[1]})
