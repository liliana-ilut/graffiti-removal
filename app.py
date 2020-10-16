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
   return """<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Graffiti Removal</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="static/css/style.css">

<!-- nav bar -->
  <div class="navigation">
    <div class="row">
      <div class="col-2" style="background-color: rgb(124, 132, 240)">
        <a href="/api" class="btn" role="button" aria-pressed="true"><strong>API</strong></a>
      </div>
          <div class="col-2" style="background-color: rgb(124, 132, 240)">
            <a href="/clustermap" class="btn" role="button" aria-pressed="true"><strong>Cluster Map</strong></a>
          </div>
          <div class="col-2" style="background-color: rgb(124, 132, 240)">
            <a href="/heatmap" class="btn" role="button" aria-pressed="true"><strong>Heat Map</strong></a>
          </div>
          <div class="col-2" style="background-color: rgb(124, 132, 240)">
            <a href="/table" class="btn" role="button" aria-pressed="true"><strong>Table</strong></a>
          </div>
          <div class="col-2" style="background-color: rgb(124, 132, 240)">
            <a href="/plot" class="btn" role="button" aria-pressed="true"><strong>Plot</strong></a>
          </div>
          <div class="col-2" style="background-color: rgb(124, 132, 240)"></div>

    
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          
          <h1 id='demo' style="color:  #34ebcf"><b>Graffiti Removal In Chicago</b></h1>
          <hr/>
          
          <p style= "background-color: rgb(124, 132, 240)">In this project, we examined requests for graffiti removal to 311. The raw csv was cleaned using pandas and sent to a sql database. The database runs 
            through a flask map. The data is examined through a variety of ways including a cluster map, heat map, filterable table based on zipcode, and a plot of 
            graffiti removal requests over time. 
              You can use the nav bar to select the visualizations or an API of the cleaned data.  
          </p>
        
         
        </div>
      </div>
      <div class="col-md-12">
        <div class="box">
          <hr/>
            <img src="static/img/Chicago.jpg" alt="Chicago Graffiti" alignment="center"> 
          <!--<iframe src="https://giphy.com/embed/3o6fITIGbYys34HW6s" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/graffiti-spraypaint-pierregof-3o6fITIGbYys34HW6s">via GIPHY</a></p>-->
        </div>
      </div>
    </div>
    <!-- <script src="path/to/shine.min.js"></script> -->
    <script src="static/js/circletype.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"></script>
      <script src="static/js/home.js"></script>
</body>

</html>

"""
 #API Page
@app.route("/api")
def api():
    graffiti = pd.read_sql_query("select * from graffiti limit 10000", con=engine)
    graffiti = graffiti.to_dict(orient="record")
    return jsonify(graffiti)



@app.route("/clustermap")
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

@app.route("/heatmap")
def heatmap():
  return """
  <!DOCTYPE html>
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
    <!-- Marker Cluster JS
    <script type="text/javascript" src="https://unpkg.com/leaflet.markercluster@1.0.3/dist/leaflet.markercluster.js"></script> -->
    <!-- Our JS -->
    <script type="text/javascript" src="static/js/config.js"></script>
    <script type="text/javascript" src="static/js/leaflet-heat.js"></script> 
    <script type="text/javascript" src="static/js/heatmap.js"></script>
    
    
  </body>
</html>
"""

@app.route("/table")
def table():
  return """
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title id="h2">GraffitiRemovalFinder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/superhero/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  <link rel="stylesheet" href="static/css/styletable.css">
</head>
<body>
  <div class="wrapper">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <!-- <a class="navbar-brand" href="indextable.html">Graffiti -->
    
          </a>
        </div>
      </div>
    </nav>
    <div class="hero text-center">
      <h1 style = "color:rgb(159, 247, 44); text-shadow: 1px 1px 25px rgb(24, 41, 3), 0 0 25px whitesmoke, 0 0 25px rgb(5, 8, 1); font-size: 100px;">Find Graffiti in Your Zip Code</h1>
      <!-- <p style = "color:rgb(159, 247, 44); text-shadow: 1px 1px 2px rgb(159, 247, 44), 0 0 25px whitesmoke, 0 0 5px rgb(5, 8, 1); font-size: 100px;">Find Graffiti in Your Zip Code</p> -->
    </div>
    <div class="container">
      <div class="row margin-top-50">
        <div class="col-md-2">
          <aside class="filters">
            <div class="panel panel-default">
              <div class="panel-heading">Filter Search</div>
              <div class="panel-body">
                <form>
                  <div class="form-group">
                    <ul class="list-group" id="filters">
                      <li class="filter list-group-item">
                        <label for="zipcode">Your Zip Code</label>
                        <input class="form-control" id="zipcode" type="text" placeholder="606--">
                      </li>
                    </ul>
                  </div>
                  
                  <button id="filter-btn" type="button" class="btn btn-default">Filter Table</button>
                  <button id="reset-btn" type="reset" class="btn btn-default btn-lg btn-block">Reset Table</button>
                 
                </form>
              </div>
            </div>
          </aside>
        </div>
        <div class="col-md-10">
          <div id="table-area" class="">
            <table id="graffiti-table" class="table table-striped">
              <thead>
                <tr>
                  <th class="table-head">Service Request Number</th>
                  <th class="table-head">Creation Date</th>
                  <th class="table-head">Status</th>
                  <th class="table-head">Completion Date</th>
                  <th class="table-head">Graffiti Surface</th>
                  <th class="table-head">Graffiti Spot</th>
                  <th class="table-head">Street Address</th>
                  <th class="table-head">Zip Code</th>
                  <th class="table-head">Ward</th>
                  <th class="table-head">Police District</th>
                  <th class="table-head">Community Area</th>
                  <th class="table-head">Latitude</th>
                  <th class="table-head">Longitude</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer" style= "text-align: center;">
      <span class="bottom" style="font-family: 'Michroma', sans-serif;">Graffiti Finder</span>
    </footer>
  </div>
  <script src="static/js/circletype.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.11.0/d3.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.5.0/d3.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
  <script src="https://d3js.org/d3.v5.min.js"></script>
  <script src="static/js/tables.js"></script>
</body>
</html>
"""

@app.route("/plot")
def plots():
  return """
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Line Plot</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
    <div id="plot"></div>
    <script src="static/js/plot.js"></script>
</body>
</html>
"""
    
if __name__ == "__main__": 
    app.run(debug= True)
