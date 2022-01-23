from flask import Flask, send_from_directory
from flask_restful import Api
from faceResource import faceReco
from flask_cors import CORS

app = Flask(__name__, static_url_path='')
CORS(app)
api = Api(app)


@app.route('/content/<path:path>')
def send_image(path):
    print('here here')
    return send_from_directory('content', path)


api.add_resource(faceReco, "/hairRecommendation")

if __name__ == "__main__":
    app.run(port=5000, debug=True, threaded=True,  host="0.0.0.0")
