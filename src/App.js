import React, { Component } from "react";
import "./App.css";
import queryString from "querystring";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import LoginPage from "./components/login-page";
import SearchPage from "./components/search-page";

const authEndPoint = "https://accounts.spotify.com/authorize?";
class App extends Component {
  onLogin = props => {
    const client_id = "7bf1ec8d3e234bec9de46297c236fb76";
    const response_type = "token";
    const redirect_uri = "http://localhost:3000/search";

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
