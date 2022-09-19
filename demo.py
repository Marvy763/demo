import os
from fastapi import File, UploadFile, Request, FastAPI
from fastapi.templating import Jinja2Templates
import pickle
from model import evaluation_model ,pred_info
# import json
# updated libraries !!!!!!!!!!!!!!!
from uuid import uuid1
from fastapi.staticfiles import StaticFiles
app = FastAPI()
# updated !!!!!!!!!!!!!!!
app.mount("/static", StaticFiles(directory="static"), name="static")



templates = Jinja2Templates(directory="templates")
model = pickle.load(open('finalized_model.sav', 'rb'))

def save_info(file,contents,cat):
    try:
        # contents = file.file.read()
        _ , file_ext = os.path.splitext(file.filename)
        with open(f"Dataset/{cat}/{cat}_"+str(uuid1(10)) + file_ext, "wb") as f:
            f.write(contents)
    except Exception as ex:
        return {"message": "There was an error uploading the file",
        "exception":f"{ex}"}
    finally: 
        file.file.close()

@app.post("/upload")
def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open("temp/uploaded_" + file.filename, "wb") as f:
            f.write(contents)
    except Exception as ex:
        return {"message": "There was an error uploading the file",
        "exception":f"{ex}"}
    finally: 
        file.file.close()
        path = "temp/uploaded_" + file.filename
        # start model
        image = evaluation_model(path)
        prediction = model.predict(image)
        # print(prediction[0])
        #end model
        global result
        result = pred_info(prediction[0])
        # put new user photo in data set
        # save_photo(prediction[0],file)
        if(prediction[0]== 0):
            save_info(file,contents,"adenocarcinoma")
        elif(prediction[0]== 1):
            save_info(file,contents,"Large_cell")
        elif(prediction[0]== 2):
            save_info(file,contents,"Normal")
        if(prediction[0]== 3):
            save_info(file,contents,"Squamous")
        # remove photo from temp folder
        os.remove(f"{path}")
        # print(result)
    return result

@app.get("/")
def main(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/upload")
def get_info(request: Request):

    return {"request": result}