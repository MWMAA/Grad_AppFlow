from flask_restful import Resource
from flask import request
from PIL import Image

from faceReco import hair_style_recommend


class faceReco(Resource):
    # Input: image to be classified
    # Output: $ Recommendation images
    @classmethod
    def post(cls):
        image = Image.open(request.files['image'])
        image.save('public/imgs/user.jpg')
        imgs = hair_style_recommend("public/imgs/user.jpg")
        return imgs, 200
