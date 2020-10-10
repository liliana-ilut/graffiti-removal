from flask import Flask, jsonify, render_template
# import sqlalchemy stuff
import sqlalchemy
from config import password
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from config import password
from sqlalchemy import create_engine



engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/graffiti')
Base = automap_base()
Base.prepare(engine, reflect=True)

# @app.route('myroute')
# def whatever():
#     session = Session(engine)
#     results = session.query(graffiti.address).all()
#     return
    


session = Session(engine)

# Create an app
app = Flask(__name__)
# Home Page
@app.route("/")

def home():
    graffiti = pd.read_sql_query("select * from graffiti limit 100", con=engine)
    graffiti = graffiti.to_dict(orient="record")
    return jsonify(graffiti)

@app.route("/index")
def index():
    return render_template('index.html')
    
if __name__ == "__main__": 
    app.run(debug= True)