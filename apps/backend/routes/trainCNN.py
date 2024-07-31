from flask import Blueprint, jsonify, request
import numpy as np 
trainCNN = Blueprint('trainCNN', __name__)
@trainCNN.route("/trainCNN", methods = ['GET'])
def handler(): 
    from models.schema import  Pitch
    allPitches = Pitch.query.all()
    pitchList = [pitch.toDict() for pitch in allPitches]
    #step one: need to split into features and classes 
    features = []
    labels = []
    i = 0
    for pitch in pitchList: 
        row = []
        row.append(pitch['activeSpin'])
        row.append(pitch['spinRate'])
        row.append(pitch['movementInches'])
        row.append(pitch['releaseSpeed'])
        row.append(pitch['movementInferred'])
        labels.append(pitch['pitchType'])
        features.append(row)
    labels = np.array(labels)
    features = np.array(features)
    index = np.argsort(np.random.random(labels.shape[0]))
    labels = labels[index]
    features = features[index]
    #90 - 10 split for testing and training 
    numTest = int(features.shape[0] * .90)
    trainingFeatures = features[:numTest]
    trainingLabels = labels[:numTest]
    testingFeatures = features[numTest:]
    testingLabels=labels[numTest:]
    np.save("./numpyArrays/trainingFeatures.npy", trainingFeatures)
    np.save("./numpyArrays/trainingLabels.npy", trainingLabels)
    np.save("./numpyArrays/testingFeatures.npy", testingFeatures)
    np.save("./numpyArrays/testingLabels.npy", testingLabels)
    


    

   







 

    return jsonify(trainingLabels.shape)