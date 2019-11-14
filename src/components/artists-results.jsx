import React, { Component } from "react";
import axios from "axios";
import queryString from "querystring";
import Result from "./result";
import config from "../config.json";

class ArtistsResults extends Component {
  state = {
    artists: []
  };

  getKeyword() {
    const search = this.props.location.search;
    const query = queryString.parse(search);
    if (query.q !== undefined) {
      return query.q;
    }
    return "";
  }

  componentDidMount() {
    this.handleArtistSearch(this.getKeyword());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleArtistSearch(this.getKeyword());
    }
  }

  async handleArtistSearch(keyword) {
    if (keyword.length > 0) {
      const searchEndPoint = "https://api.spotify.com/v1/search?";
      const query = queryString.parse(searchEndPoint);
      query.q = keyword;
      query.type = "artist";
      query.market = "US";
      const endpoint = decodeURIComponent(queryString.stringify(query));

      const token = config.token;
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      const { data } = await axios.get(endpoint, options);
      this.setState({ artists: data.artists });
    } else {
      this.setState({ artists: undefined });
    }
  }

  render() {
    const { onClick } = this.props;
    return (
      <div className="row">
        {this.renderArtists(this.state.artists, onClick)}
      </div>
    );
  }

  renderArtists(artists, onClick) {
    if (
      artists !== undefined &&
      artists.items !== undefined &&
      artists.items.length > 0
    ) {
      return artists.items.map(artist => (
        <Result key={artist.id} artist={artist} onClick={onClick} />
      ));
    }
    return (
      <div className="col col-4">
        <h5>No results found</h5>
      </div>
    );
  }
}

export default ArtistsResults;
