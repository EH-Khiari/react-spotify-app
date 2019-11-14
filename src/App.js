import React, { Component } from "react";
import "./App.css";
import queryString from "querystring";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import LoginPage from "./components/login-page";
import SearchPage from "./components/search-page";
import config from "./config.json";

class App extends Component {
  onLogin = props => {
    const authEndPoint = "https://accounts.spotify.com/authorize?";
    const client_id = config.client_id;
    const response_type = "token";
    const redirect_uri = config.redirect_uri;

    const query = queryString.parse(authEndPoint);
    query.client_id = client_id;
    query.response_type = response_type;
    query.redirect_uri = redirect_uri;

    const authorize_redirect = decodeURIComponent(queryString.stringify(query));

    console.log("redirecting to:", authorize_redirect);
    window.location = authorize_redirect;
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/search" render={props => <SearchPage {...props} />} />;
          <Route
            path="/"
            exact
            render={props => <LoginPage {...props} onLogin={this.onLogin} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
