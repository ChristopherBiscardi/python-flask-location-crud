import os
import json
from urlparse import urlparse
from flask import Flask, render_template, request
from negotiate.flask import Formatter, negotiate
import pymongo
from bson.objectid import ObjectId
from googlegeocoder import GoogleGeocoder
geocoder = GoogleGeocoder()

app = Flask(__name__)


# Get MongoDB URL if on Heroku, else use localhost
MONGO_URL = os.environ.get('MONGOHQ_URL')

if MONGO_URL:
    # Get a connection
    conn = pymongo.Connection(MONGO_URL)

    # Get the database
    db = conn[urlparse(MONGO_URL).path[1:]]
else:
    # Not on Heroku, do some localhost action
    conn = pymongo.Connection('localhost', 27017)
    db = conn['test']
    app.debug = True

#locations Collection
locationsC = db.locations

# Content Negotiation Formatters


class JSONFormatter(Formatter):
    format = 'json'
    mimetypes = ['application/json']

    def render(self, obj):
        return json.dumps(obj)


class HTMLFormatter(Formatter):
    format = 'json'
    mimetypes = ['text/html']

    def configure(self, template):
        self.template = template

    def render(self, obj):
        return render_template(self.template, **obj)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/locations', methods=['GET', 'POST'])
@negotiate(JSONFormatter)
@negotiate(HTMLFormatter, template='locations.html')
def locations():
    if request.method == 'POST':
        if valid_location(request.form['name'],
                          request.form['address']):
            return create_location(request.form['name'],
                                   request.form['address'])
    else:
        return show_locations()


def create_location(name, address):
    search = geocoder.get(address)
    loc = search[0].geometry.location
    if search is not None and loc is not None:
        loc_id = locationsC.insert({"name": name,
                                   "loc": [loc.lng, loc.lat],
                                   "address": search[0].formatted_address})

        if loc_id is not None:
            return {"success": True,
                    "location": str(loc_id)}
        else:
            return {"success": False}
    else:
        return {"success": False}


def show_locations():
    locations = locationsC.find()
    objects = []
    for item in locations:
        item['_id'] = str(item['_id'])
        objects.append(item)
    if len(objects) == 0:
        return {'locations': objects}
    else:
        return {'locations': objects}


@app.route('/locations/<id>')
@negotiate(JSONFormatter)
@negotiate(HTMLFormatter, template='location.html')
def view_location(id):
    if len(id) == 24:
        location = locationsC.find_one({"_id": ObjectId(id)})
        if location is not None:
            location['_id'] = str(location['_id'])
            return {'location': location}
        else:
            return {}
    else:
        return {}


def valid_location(name, address):
    if name is not None and address is not None:
        return True
    else:
        return False

if __name__ == '__main__':
    # Bind to PORT || 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
