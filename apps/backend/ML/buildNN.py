'''
NOTE -> do not run this file in production. should only be run during development 
'''
import numpy as np
from sklearn.neural_network import MLPClassifier
import joblib

def handler(): 
    #get training features and labels 
    trainingFeatures = np.load("../numpyArrays/trainingFeatures.npy")
    trainingLabels = np.load("../numpyArrays/trainingLabels.npy")
    testingFeatures = np.load("../numpyArrays/testingFeatures.npy")
    testingLabels = np.load("../numpyArrays/testingLabels.npy")
    print(trainingFeatures.shape)
    print(testingFeatures.shape)

    types = { 
        "4-Seam Fastball": 0, 
        "Changeup": 1, 
        "Curveball":2, 
        "Cutter":3, 
        "Sinker":4, 
        "Slider":5, 
        "Split-Finger":6, 
        "Sweeper":7, 
        "Slurve":8
    }
    numClasses = 8

    #declare training variables 
    batchSize = 36 
    epochs = 16 
    #change labels from strings to one hot vectors 
    newTrainingLabels = []
    newTestingLabels = []
    for label in testingLabels: 
        newTestingLabels.append(types[label])
    for label in trainingLabels: 
        newTrainingLabels.append(types[label])
    testingLabels = np.array(newTestingLabels)
    trainingLabels = np.array(newTrainingLabels)
    #standardize feature vectors 
    # trainingFeatures = ((trainingFeatures -  trainingFeatures.mean(axis=0)) / trainingFeatures.std(axis=0))
    # testingFeatures = ((testingFeatures -  testingFeatures.mean(axis=0)) / testingFeatures.std(axis=0))
    model = MLPClassifier(
        solver="adam", #use gradient descent (Stochastic) - this solver will find weights and biases which minimize loss
        verbose=True, #prevent dump to command line
        tol=1e-8 , #set low tolerance so that we can train the requested number of epocs 
        nesterovs_momentum=False, #turn off nesterovs momentum - use standard instead 
        early_stopping=True, #turn off early stopping - we want all iterations of the training to go through 
        #set momentum. epocs and learning rate to their default rates 
        learning_rate_init = 0.001,
        momentum=0.9 ,
        max_iter=200,
        hidden_layer_sizes=(2000, 1000, 5000), #this is the tuple passed into the function, where each entry in the tuple is the number of nodes in the specific layer
        activation="relu", #pass in the activation function 
    )
    # model.fit(trainingFeatures, trainingLabels)
    

    # score = model.score(testingFeatures, testingLabels)
    # print(score)
    # joblib.dump(model, 'classifier.pkl')
    model = joblib.load('classifier.pkl')
    test = [95.3, 14.8, -4, 5.4, -26]
    testTwo = []
    # testTwo.append(itemX)
    
    print(model.predict([test]))





handler()