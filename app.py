import io

from flask import *
from PIL import Image
import numpy as np
import cv2
import keras

app = Flask(__name__)
entered_Name = ""


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html')


@app.route("/upload-image", methods=["GET", "POST"])
def upload_image():
    print("------------Entered In the upload-image------------------")
    if request.method == "POST":
        print("------------Entered In the if request.method == POST------------------")
        if request.files:
            print("------------Entered In the if request.files------------------")
            photo = request.files.get('file')
            print("------------1------------------")
            in_memory_file = io.BytesIO()
            print("------------2------------------")

            print("------------3------------------")
            data = np.fromstring(request.files.get('file').getvalue(), dtype=np.uint8)
            print("------------4------------------")
            color_image_flag = 1
            print("------------5------------------")
            img = cv2.imdecode(data, color_image_flag)
            print("------------6------------------")
            full_size_image = img
            print("------------7------------------")
            im = cv2.resize(full_size_image, (224, 224), interpolation=cv2.INTER_CUBIC)
            print("------------2------------------")
            im = np.expand_dims(im, axis=0)
            print("------------8------------------")
            x = np.array(im)
            print("------------9------------------")
            model = keras.models.load_model(r'static\Models\model.h5')
            print("------------10------------------")
            predictedOutput = model.predict(x)
            print(predictedOutput)
            print(str(predictedOutput[0, 0]))
            print(str(predictedOutput[0, 1]))
            print("------------11------------------")
            return jsonify({'Index1': str(predictedOutput[0, 0]),
                            "Index2": str(predictedOutput[0, 1])
                            })

    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)
