from flask import Blueprint 

makeClassification = Blueprint('makeClassification', __name__)
@makeClassification.route('/makeClassification', methods = ['POST'])
def handler(): 
    return request