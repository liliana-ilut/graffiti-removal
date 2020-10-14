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
    # return render_template("home.html")
    return """
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Graffiti Removal</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">

<!-- nav bar -->
  <div class="navigation">
    <div class="row">
      <div class="col-4" style="background-color: rgb(124, 132, 240)">
        <a href="/api" class="btn" role="button" aria-pressed="true"><strong>API</strong></a>
      </div>
          <div class="col-4" style="background-color: rgb(124, 132, 240)">
            <a href="/maps" class="btn" role="button" aria-pressed="true"><strong>Maps</strong></a>
          </div>
          <div class="col-4" style="background-color: rgb(124, 132, 240)">
            <a href="/maps" class="btn" role="button" aria-pressed="true"><strong>Charts</strong></a>
          </div>

    
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <h1><b>Graffiti Removal In Chicago</b></h1>
          <hr/>
          
          <p>In this project, we examined requests for graffiti removal to 311 from 2011-2019. The data is examined through a heat map, a cluster map, and charts. 
              You can use the nav bar to select the visualizations or an API of the cleaned data.  
          </p>
        
         
        </div>
      </div>
      <div class="col-md-12">
        <div class="box">
          <hr/>
           <img src="static/img/Chicago.jpg" alt="Chicago Graffiti" >
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"></script>
</body>

</html>
"""
 #API Page
@app.route("/api")
def api():
    graffiti = pd.read_sql_query("select * from graffiti", con=engine)
    graffiti = graffiti.to_dict(orient="record")
    return jsonify(graffiti)



@app.route("/maps")
def index():
  return """<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="UTF-8">
    <title>Graffiti Removal</title>

    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.3/dist/leaflet.css"
    integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
    crossorigin=""/>

    <!-- Marker Cluster CSS -->
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.0.3/dist/MarkerCluster.css">
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.0.3/dist/MarkerCluster.Default.css">

    <!-- Our CSS -->
    <link rel="stylesheet" type="text/css" href="static/css/style.css">

  </head>
  <body>

    <div id="map"></div>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.3.3/dist/leaflet.js"
    integrity="sha512-tAGcCfR4Sc5ZP5ZoVz0quoZDYX5aCtEm/eu1KhSLj2c9eFrylXZknQYmxUssFaVJKvvc0dJQixhGjG2yXWiV9Q=="
    crossorigin=""></script>
    <!-- d3 JS -->
    <script src="https://d3js.org/d3.v5.min.js"></script>

    <!-- Marker Cluster JS -->
    <script type="text/javascript" src="https://unpkg.com/leaflet.markercluster@1.0.3/dist/leaflet.markercluster.js"></script>

    <!-- Our JS -->
    <script type="text/javascript" src="static/js/config.js"></script>
    <script type="text/javascript" src="static/js/leaflet-heat.js"></script> 
    <!-- <script type="text/javascript" src="static/js/heatmap.js"></script> -->
    <script type="text/javascript" src="static/js/clusters.js"></script>
    

  </body>
</html>
"""
    # return render_template('index.html')

    
if __name__ == "__main__": 
    app.run(debug= True)