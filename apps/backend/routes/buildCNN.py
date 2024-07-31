from flask import Blueprint, jsonify, request
import numpy as np 
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
    trainingFeatures = np.load("trainingFeatures.npy")   
    trainingLabels = np.load("trainingLabels.npy")
    testingFeatures = np.load("testingFeatures.npy")
    testingLabels = np.load("testingLabels.npy")
    # inputShape = (7, 1)
    # #define model 
    # model = Sequential()
    # model.add(Conv1D(32, kernel_size = 5, activation = 'relu', input_shape = inputShape))
    # model.add(MaxPooling1D(pool_size = 2))
    # model.add(Dropout(0.25))
    # model.add(Flatten())
    # model.add(Dense(512, activation ="relu"))
    # model.add(Dropout(0.5))
    # model.add(Dense(numClasses, activation = "softmax"))
    # model.complile(loss = keras.losses,)
