import React, { Component } from "react";
import axios from "axios";
import queryString from "querystring";
import Result from "./result";
import config from "../config.json";

class AlbumsResults extends Component {
  state = {
    albums: []
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
    this.handleAlbumSearch(this.getKeyword());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleAlbumSearch(this.getKeyword());
    }
  }

  async handleAlbumSearch(keyword) {
    if (keyword.length > 0) {
      const artistEndPoint =
        "https://api.spotify.com/v1/artists/" + keyword + "/albums?";
      const query = queryString.parse(artistEndPoint);
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
      this.setState({ albums: data.items });
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.albums.map(album => (
          <Result key={album.id} album={album} />
        ))}
      </div>
    );
  }
}

export default AlbumsResults;
