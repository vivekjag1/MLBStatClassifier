from flask import Blueprint 
import numpy as np 

seedDatabase = Blueprint('seedDB', __name__)
@seedDatabase.route('/seedDB', methods=['GET'])

def parseFile(): 

    ''' 
    1: read in .csv file
    '''
    with open('./data/allPitches2024.csv') as f: 
        allPitches = [i for i in f.readlines() if i!=',']
    print(allPitches)
    return allPitches