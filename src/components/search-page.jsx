import React, { Component } from "react";
import queryString from "querystring";
import { Switch, Route } from "react-router-dom";
import ArtistsResults from "./artists-results";
import AlbumsResults from "./albums-results";

class SearchPage extends Component {
  handleSearchBoxChange = e => {
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
              />
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
            render={props => <AlbumsResults {...props} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default SearchPage;
