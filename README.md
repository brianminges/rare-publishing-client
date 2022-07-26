![allposts](https://user-images.githubusercontent.com/91277363/183235609-7283cadd-90fc-4bff-8560-18da21366ecd.png)

# Rare Publishing: It's sorta like Facebook

## General information
This is a group full stack project (React, Django) as part of a software development bootcamp at Nashville Software School. Other contributors were [madison-hepner](https://github.com/madison-hepner), [snagle33](https://github.com/snagel33) and [kylebuckner88](https://github.com/kylebuckner88). My contributions were creating posts; displaying posts based on subscriptions, all posts and user posts; post submission form; all comment functionality; filtering for user and title search; all design and css. 

## Technologies
- React v.17
- ES6
- Python v.3.9
- Django v.4.0
- HTML5
- CSS3
 
## Features
- Full CRUD capabilities.
- Sign in allows for multiple, distinct users and profiles.
- Users can only edit/delete posts or comments they make.
- Post title links to the full post, which displays the photo, text and options for comments.
- Users can subscribe to other users; the subscription button changes to an 'unsubscribe' button.
- Posts can be filtered by category, creator or a title keyword search.
- Users can create/edit/delete categories for posts.
- User profiles can be accessed by clicking on 'User management' tab and then on the user's name.
- User profiles display differently based on presence of profile photo.

## Selected pages and features
Click to enlarge  
<br/><br/> 
<img src="https://user-images.githubusercontent.com/91277363/183235503-2320aecd-b41a-442f-9b55-0449347557ee.gif" width="23%"></img> <img src="https://user-images.githubusercontent.com/91277363/183235508-e493b8ae-882b-4157-8a9f-945bf7f59378.gif" width="23%"></img> <img src="https://user-images.githubusercontent.com/91277363/183235551-c8fc1dae-6abd-48e9-a2ed-c40ea9575151.gif" width="23%"></img> <img src="https://user-images.githubusercontent.com/91277363/183235554-3ec364ba-1a7b-48c9-afd3-9222e16e409b.gif" width="23%"></img> <img src="https://user-images.githubusercontent.com/91277363/183235557-0785664a-c0fa-4a3a-8857-9b5cdb723a87.gif" width="23%"></img> <img src="https://user-images.githubusercontent.com/91277363/183235558-f6673bd8-b49b-4346-81aa-f5f2172e4bf1.gif" width="23%"></img> <img src="https://user-images.githubusercontent.com/91277363/183235559-5be37afa-6607-4a00-a1be-050ad9572b4c.gif" width="23%"></img>  


## Setup
### Front end
1. Clone this reposity.
2. `cd` into the directory it creates.
3. Run `npm install` and wait for all dependencies to be installed.
### Back end
5. Clone the [backend repository](https://github.com/brianminges/rare-publishing-server).
6. Run `pyenv install 3.9.10` in the backend directory to install Python.
7. Run `python3 -m pip install pipenv` in the backend directory to install the virtual environment. 
8. Run `pipenv install django autopep8 pylint djangorestframework django-cors-headers pylint-django` to install the necessary third-party packages.
9. From the backend directory, run `touch .env` to create a `.env` file on the same level as `manage.py`.
10. Run `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
11. Copy the output.
12. Open the `.env` file and add `MY_SECRET_KEY=<paste output>` (without the angle brackets, and without any quotes)
13. Stop your virtual environment`Ctrl + D`, and then restart it `pipenv shell`.
### Database
14. Run `python3 manage.py makemigrations rareapi` from inside your virtual enviroment. 
15. Run `python3 manage.py migrate` from inside your virtual enviroment. 
*You should now have a db.sqlite3 file in the project folder. Make a connection to the database with SQLite Explorer to see the tables in the database.*
16. Seed the database by running these commands in this exact order: 
- `python3 manage.py loaddata user` 
- `python3 manage.py loaddata tokens`
- `python3 manage.py loaddata rareuser`
- `python3 manage.py loaddata tag`
- `python3 manage.py loaddata reaction`
- `python3 manage.py loaddata category`
- `python3 manage.py loaddata demotion`
- `python3 manage.py loaddata post`
- `python3 manage.py loaddata comment`
- `python3 manage.py loaddata subscription`
### Starting in browser
16. With the virtual environment running, run `python3 manage.py runserver` from the backend directory after the virtual enviroment has started.
17. Run `npm start` from the frontend directory to verify installation was successful

## Project status
Complete. 

