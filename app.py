from flask import Flask
from db import init_db
from routes import routes_blueprint
from flask_cors import CORS
from config import Config

def create_app():
	app = Flask(__name__)
	app.config.from_object(Config)

	CORS(app, resources={r'/*': {'origins': '*'}})
	init_db(app)

	app.register_blueprint(routes_blueprint)
	return app

if __name__ == '__main__':
	app = create_app()
	app.run(host='127.0.0.1', port=5000, debug=True)
	
