# Shopping List App

> Built using Django and Hotwire

To run this, after cloning the repository:

```bash
sudo apt install libpq-dev postgresql

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

./manage.py migrate
./manage.py createsuperuser
./manage.py loaddata data.json
./manage.py runserver


# Save requirements
pip freeze > requirements.txt

# Start with webpack build
python manage.py webpack --build && ./manage.py collectstatic && ./manage.py runserver
```

Go to `http://localhost:8000`

Log into `http://localhost:8000/admin` for the admin interface.

Go to `https://localhost:8000/o/applications` to register the webapp as an OAuth application. Use the client id from `environement.ts` for local development. *Client type* is public and authorization type is "Ressource owner password".

The webapp runs on `http://localhost:8100`.

# Open API

> TODO NPM package angular client?

* API URL: `http://localhost:8000/api/`

* API Scheme: `http://localhost:8000/api/openapi`

* Generate schema: `./manage.py generateschema --file openapi-schema.yml`

* Update TS Client: `cd webapp && npm run generate`
