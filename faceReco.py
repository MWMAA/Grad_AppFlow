import cv2
from PIL import Image
import tensorflow as tf
from PIL import Image
import os


def hair_style_recommend(image_path):
    model = tf.keras.models.load_model(
        'content\MobileNetmodel.h5')

    if (image_path.endswith('JPEG') or image_path.endswith('jpeg') or image_path.endswith('jpg') or image_path.endswith(
            'PNG') or image_path.endswith('png')):
        image = Image.open(image_path)
        image = image.convert('RGB')
        image_path = image_path.split('.')[0]+'.JPG'
        image.save(image_path + '.JPG')

    img = cv2.imread(image_path)
    img.resize(1, 224, 224, 3, refcheck=False)
    output_precentages = max(model.predict_on_batch([img]))
    output_label = output_precentages.argmax(axis=0)
    fsarr = ['heart', 'oblong', 'oval', 'round', 'square']
    fs = fsarr[output_label]
    hsloc4 = None

    hsa = ['Blunt bob above the shoulder',
           'Shoulder length cut with subtle layers',
           'Side swept bangs',
           'Sleek hairsyles',
           'Soft,wispy side-swept bangs',
           'Straight hair with long layers',
           'Short, subtle bangs that hit the cheekbones',
           'Textured lob',
           'Deep side part',
           'Slick back,high ponytail',
           'Pixie cut with volume at the top',
           'Shoulder length lob',
           'Deep side part with loose waves',
           'Layers that break at the collarbone',
           'Loose curls that start close to the roots',
           'Flat iton waves', 'Salon-style blowout with volume',
           'Long layers that break at the collarbone']

    m = 'Recommended Hairstyles: '

    first_part = "http://192.168.1.101:5000/"

    if(fs == 'oval'):
        hs = m+hsa[0]+" or "+hsa[1]+hsa[2]+" or "+hsa[3]
        hsloc1 = first_part + 'content/0.PNG'
        hsloc2 = first_part + 'content/1.PNG'
        hsloc3 = first_part + 'content/2.PNG'
        hsloc4 = first_part + 'content/3.PNG'
        return [{'link': hsloc1, 'desc': hsa[0]}, {'desc': hsa[1], 'link':hsloc2}, {'desc': hsa[2], 'link':hsloc3}, {'desc': hsa[3], 'link':hsloc4}]
    elif(fs == 'square'):
        hs = m+hsa[4]+" or "+hsa[5]+" or "+hsa[6]
        hsloc1 = first_part + 'content/4.PNG'
        hsloc2 = first_part + 'content/5.PNG'
        hsloc3 = first_part + 'content/6.PNG'
        return [{'desc': hsa[4], 'link':hsloc1}, {'desc': hsa[5], 'link':hsloc2}, {'desc': hsa[6], 'link':hsloc3}]
    elif(fs == 'round'):
        hs = m+hsa[7]+" or "+hsa[8]+" or "+hsa[9]+" or "+hsa[10]
        hsloc1 = first_part + 'content/7.PNG'
        hsloc2 = first_part + 'content/8.PNG'
        hsloc3 = first_part + 'content/9.PNG'
        hsloc4 = first_part + 'content/10.PNG'
        return [{'desc': hsa[7], 'link':hsloc1}, {'desc': hsa[8], 'link':hsloc2}, {'desc': hsa[9], 'link':hsloc3}, {'desc': hsa[10], 'link':hsloc4}]
    elif(fs == 'heart'):
        hs = m+hsa[11]+" or "+hsa[12]+" or "+hsa[13]
        hsloc1 = first_part + 'content/11.PNG'
        hsloc2 = first_part + 'content/12.PNG'
        hsloc3 = first_part + 'content/13.PNG'
        return [{'desc': hsa[11], 'link':hsloc1}, {'desc': hsa[12], 'link':hsloc2}, {'desc': hsa[13], 'link':hsloc3}]
    elif(fs == 'oblong'):
        hs = m+hsa[14]+" or "+hsa[15]+" or "+hsa[16]+" or "+hsa[17]
        hsloc1 = first_part + 'content/14.PNG'
        hsloc2 = first_part + 'content/15.PNG'
        hsloc3 = first_part + 'content/16.PNG'
        hsloc4 = first_part + 'content/17.PNG'
        return [{'desc': hsa[14], 'link':hsloc1}, {'desc': hsa[15], 'link':hsloc2}, {'desc': hsa[16], 'link':hsloc3}, {'desc': hsa[17], 'link':hsloc4}]
