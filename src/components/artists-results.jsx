import React, { Component } from "react";
import axios from "axios";
import queryString from "querystring";
import Result from "./result";

const token =
  "BQAagahVVoLLfrqK0_8d3Dg3gZDeDZEJUOk0WUIsbDlblOPT-ie9VaUtv8JCz1Jd1ska2zmyxN5WqR_2CfHjrXzjzaKKTLGuqPG_mwUv4GbiyggFtLxWZR7jKdfVZPYgO2udgFFutGaMJYOEShBs0nAH6-dBQfc_-pc6";
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

      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      const { data } = await axios.get(endpoint, options);
      this.setState({ artists: data.artists });
      console.log(this.state.artists);
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
    if (artists !== undefined && artists.items !== undefined) {
      return artists.items.map(artist => (
        <Result key={artist.id} artist={artist} onClick={onClick} />
      ));
    }
  }
}

export default ArtistsResults;
