from flask import Blueprint, jsonify
import numpy as np
getAverages = Blueprint('getAverages', __name__)
@getAverages.route('/getAverages', methods=['GET'])
def handler(): 
    testingFeatures = np.load("./numpyArrays/testingFeatures.npy", allow_pickle=True)
    trainingFeatures = np.load("./numpyArrays/trainingFeatures.npy")
    allItems = np.concatenate((trainingFeatures, testingFeatures), axis=0, allow_pickle=True)
    averages = np.mean(allItems, axis = 0)
    averages = averages.tolist()

   
    return jsonify(averages)
