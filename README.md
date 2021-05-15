# Shopping List App

> Built using Django and Hotwire

To run this, after cloning the repository:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

./manage.py migrate
./manage.py createsuperuser
./manage.py loaddata data.json
./manage.py runserver
```

Log into `http://localhost:8000/admin` and create a `Room`
Go to `http://localhost:8000`
