from flask import Blueprint, request, jsonify
import pickle 
makeClassification = Blueprint('makeClassification', __name__)
with open('./ML/classifier.pkl', "rb") as f: 
        model = pickle.load(f)
@makeClassification.route('/makeClassification', methods = ['POST'])
def handler(): 
    req = request.json
    input = [req['velocity'], req['z-break'], req['rise'], req['x-break'], req['tail']]
    res =  model.predict([input])
    retVal =  [int(item) for item in res]
    return ({"result":retVal})