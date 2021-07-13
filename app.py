from flask import Flask
from flask_restful import Api
from faceResource import faceReco
from flask_cors import CORS

app = Flask(__name__)
CORS(app, support_credentials=True)
cors = CORS(app, resources={r"/": {"origins": ""}})
api = Api(app)

api.add_resource(faceReco, "/hairRecommendation")

if __name__ == "__main__":
    app.run(port=5001, debug=True)
