import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class Result extends Component {
  handlePreview(external_url) {
    console.log("Redirecting to", external_url);
  }

  render() {
    const { artist, onClick, album, onPreviewClick } = this.props;
    let isArtist = true;
    let id = null;

    if (artist != null) {
      id = artist.id;
    } else {
      id = album.id;
      isArtist = false;
    }

    //const classname = "result-box border-2 border-dark";
    const classname = "col col-md-2 m-20";
    if (isArtist) {
      return (
        <div className={classname} onClick={() => onClick(id)}>
          {this.renderResultBox(artist, album, onPreviewClick)}
        </div>
      );
    }
    return (
      <div className={classname}>
        {this.renderResultBox(artist, album, onPreviewClick)}
      </div>
    );
  }

  renderResultBox(artist, album, onPreviewClick) {
    let name,
      artist_names,
      images,
      release_date,
      popularity,
      total_tracks,
      spotify_external_url = null;
    let followers = 0;
    let rating = 0;

    if (artist != null) {
      name = artist.name;
      images = artist.images;
      followers = artist.followers.total;
      popularity = artist.popularity;
      rating = Math.round(popularity / 20.0);
    } else {
      name = album.name;
      images = album.images;
      artist_names = album.artists;
      release_date = album.release_date;
      total_tracks = album.total_tracks;
      spotify_external_url = album.external_urls.spotify;
    }
    if (name.length > 35) {
      name = name.substring(0, 35) + "...";
    }

    return (
      <div className="result-box border-2 border-dark">
        <div className="image-box border-bottom-2 border-dark">
          {this.renderImage(images)}
        </div>
        <div className="info-box">
          <div className="row ml-1 mr-1">
            <h5>{name}</h5>
          </div>
          <div className="row ml-1 mr-1">
            <h6 className="text-muted">
              {this.renderSecondRow(followers, artist_names)}
            </h6>
          </div>
          <div className="row ml-1 mr-1 third-row">
            {this.renderThirdRow(rating, release_date)}
          </div>
          {this.renderFourthRow(total_tracks)}
        </div>
        {this.renderSpotifyLink(spotify_external_url, onPreviewClick)}
      </div>
    );
  }

  renderImage(images) {
    if (images != null && images.length > 0) {
      return <img className="thumbnail" alt="" src={images[0].url} />;
    } else {
      return <h4 className="center">No image available</h4>;
    }
  }

  renderSecondRow(followers, artist_names) {
    if (artist_names === undefined) {
      return this.numberWithCommas(followers) + " followers";
    }
    return artist_names.map((artist_name, i) => {
      if (i === artist_names.length - 1) {
        return artist_name.name;
      } else {
        return artist_name.name + " - ";
      }
    });
  }

  renderThirdRow(rating, release_date) {
    if (release_date === undefined) {
      return (
        <StarRatings
          rating={rating}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="35"
          starSpacing="1"
          name="Popularity"
        />
      );
    } else return <small className="text-muted">{release_date}</small>;
  }

  renderFourthRow(total_tracks) {
    if (total_tracks !== undefined) {
      return (
        <div className="row ml-1 mr-1 fourth-row">
          <h6 className="text-muted">{total_tracks} tracks</h6>
        </div>
      );
    }
    return null;
  }

  renderSpotifyLink(spotify_external_url, onPreviewClick) {
    if (spotify_external_url !== null) {
      /*return (
        <div
          className="preview center-text border-2 m-l-n-1"
          onClick={() => onPreviewClick(spotify_external_url)}
        >
          Preview on Spotify
        </div>
      );*/
      return (
        <a className="preview center-text" href={spotify_external_url}>
          Preview on Spotify
        </a>
      );
    }
  }

  numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default Result;
