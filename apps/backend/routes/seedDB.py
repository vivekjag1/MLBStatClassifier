from flask import Blueprint, jsonify
import numpy as np 

seedDatabase = Blueprint('seedDB', __name__)
@seedDatabase.route('/seedDB', methods=['GET'])

def parseFile(): 

    ''' 
    1: read in .csv file
    '''
    with open('./data/allPitches2024.csv') as f: 
        allPitches = [i for i in f.readlines() if i!=',']

    allPitches = np.array(allPitches)
    allPitches = allPitches[1:]

    #now we need to split into individual lines 

    splitArray = []
    rowLen = len(allPitches[1])
    for pitch in allPitches:
        thisRow = np.zeros(rowLen)
        thisRow = pitch.split(',')
          #last 
        splitArray.append(thisRow[1:])





       




        #do some processing on first, second, and last items

  







    print(allPitches)
    return jsonify(splitArray)