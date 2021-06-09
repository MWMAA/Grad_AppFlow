from flask import Flask
from flask_restful import Api
from faceResource import faceReco

app = Flask(__name__)
api = Api(app)

api.add_resource(faceReco, "/hairRecommendation")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
