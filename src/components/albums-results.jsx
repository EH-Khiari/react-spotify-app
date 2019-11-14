import React, { Component } from "react";
import axios from "axios";
import queryString from "querystring";
import Result from "./result";

const token =
  "BQAagahVVoLLfrqK0_8d3Dg3gZDeDZEJUOk0WUIsbDlblOPT-ie9VaUtv8JCz1Jd1ska2zmyxN5WqR_2CfHjrXzjzaKKTLGuqPG_mwUv4GbiyggFtLxWZR7jKdfVZPYgO2udgFFutGaMJYOEShBs0nAH6-dBQfc_-pc6";
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
    const { onPreviewClick } = this.props;
    return (
      <div className="row">
        {this.state.albums.map(album => (
          <Result
            key={album.id}
            album={album}
            onPreviewClick={onPreviewClick}
          />
        ))}
      </div>
    );
  }
}

export default AlbumsResults;
