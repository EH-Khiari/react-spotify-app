import React, { Component } from "react";
import axios from "axios";
import queryString from "querystring";
import { Switch, Route } from "react-router-dom";
import ArtistsResults from "./artists-results";
import AlbumsResults from "./albums-results";

const token =
  "BQBvNyGBWs-vrOPlHf2BpcV38PDTSsX5J-7AjNnKzD91Nvjf9mJ7nWM7YMXQipOMaq4UnmEWEJ3dYJqBL0BRYzvunFwV9x4Td5hZSxO4DOriJKPfP4Hxm5qzHWQWGf9THLbcVFZnAUJNXjWL09YiO86C6GdbEtPMm1Ol";
class SearchPage extends Component {
  // state = {
  //   keyword: ""
  // };

  // constructor(props) {
  //   super(props);

  //   this.onClick = this.onClick.bind(this);
  //   this.handleKeyPress = this.handleKeyPress.bind(this);
  // }

  handleSearchBoxChange = e => {
    //this.setState({ keyword: e.currentTarget.value });
    this.pushToArtistPage(e.currentTarget.value);
  };

  pushToArtistPage(keyword) {
    const artistsEndpoint = "/search/artists?";
    const query = queryString.parse(artistsEndpoint);
    query.q = keyword;
    console.log(
      "Redirecting to:",
      decodeURIComponent(queryString.stringify(query))
    );
    this.props.history.push(decodeURIComponent(queryString.stringify(query)));
  }

  onClick() {
    this.pushToArtistPage();
  }

  onArtistClick = id => {
    const albumsEndpoint = "/search/albums?";
    const query = queryString.parse(albumsEndpoint);
    query.q = id;
    console.log(
      "Redirecting to:",
      decodeURIComponent(queryString.stringify(query))
    );
    this.props.history.push(decodeURIComponent(queryString.stringify(query)));
  };

  onPreviewClick = external_url => {
    console.log("external_url", external_url);
  };

  // handleKeyPress(e) {
  //   if (e.key === "Enter") {
  //     this.pushToArtistPage();
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="search-area">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control search-box"
                placeholder="Search for an artist..."
                onChange={this.handleSearchBoxChange}
                onKeyPress={this.handleKeyPress}
              />
              {/* <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.onClick}
                >
                  Search
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <Switch>
          <Route
            path="/search/artists"
            render={props => (
              <ArtistsResults {...props} onClick={this.onArtistClick} />
            )}
          />
          <Route
            path="/search/albums"
            render={props => (
              <AlbumsResults {...props} onPreviewClick={this.onPreviewClick} />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default SearchPage;
