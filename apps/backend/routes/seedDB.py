from flask import Blueprint, jsonify
import numpy as np 

seedDatabase = Blueprint('seedDB', __name__)
@seedDatabase.route('/seedDB', methods=['GET'])
def parseFile(): 
    ''' 
    1: read in .csv file
    2: create a pitches table with all of the info in the .csv (for now, may choose to ignore certain fields later, and enter the )
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
        #have to handle the first, second, and last items 
        #last 
        lastItem = pitch[-1]
        thisRow[-1] = thisRow[-1].replace('\n', '')
          #first
        # thisRow[0] = thisRow[0].replace('')
        thisRow[1] = thisRow[1].replace("\"", '')
        thisRow[2] = thisRow[2].replace("\"", '').strip()

        splitArray.append(thisRow[1:])
    return jsonify(splitArray)