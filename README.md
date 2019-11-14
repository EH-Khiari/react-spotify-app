
## Description

A simple spotify app written in React, used to search for artists and browse throught their albums.

## Running the application

The app is set to run in development mode. 
1. Clone/download the master branch of the repository locally and extract the contents of the compressed file.
2. Using your command line/prompt, `cd` to the extracted folder
3. Install node by running `npm i`
4. Run the application by running `npm start`. The application will launch on [http://localhost:3000](http://localhost:3000). 

NOTE: Make sure to read the below section before running the application step 4.


## Important Configurations

Inside the `src` folder of the application, there is a `config.json` file that must be inspected before running the application. This file consists of the following:

* `client_id`: the client ID you get when registering the app. To register an app, simply head over to https://developer.spotify.com/dashboard/ and login using your spotify account. Once logged in, click on the 'Create a client ID' button' and follow the steps. Once done, click on the newly created application and you should be able to see the client ID displayed on the page.

* `redirect_uri`: the page to redirect to after a successful login attempt, which in this case is http://localhost:3000/search. To enable this, click on the registered app on your spotify developer dashboard page, click on the 'Edit Settings' button, and add the URL under the 'Redirect URIs' section.

* `token`: A temporary token used in the implicit grant authorization flow. To retreive a token, head over to https://developer.spotify.com/console/get-search-item/?q=&type=&market=&limit=&offset= an click on the 'Get Token' button at the bottom. Make sure to refresh this token on occasion to make sure a 401 error isn't given from the spotify API.

