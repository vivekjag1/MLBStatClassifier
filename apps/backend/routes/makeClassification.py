from flask import Blueprint, request, jsonify
import joblib
makeClassification = Blueprint('makeClassification', __name__)
@makeClassification.route('/makeClassification', methods = ['POST'])
def handler(): 
    model = joblib.load('./ML/classifier.pkl')
    req = request.json
    input = [req['velocity'], req['z-break'], req['rise'], req['x-break'], req['tail']]
    res =  model.predict([input])
    retVal =  [int(item) for item in res]

    return ({"result":retVal})