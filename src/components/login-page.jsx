import React from "react";
import spotify_logo from "../images/spotify-logo.png";

const LoginPage = props => {
  return (
    <div id="wrapper">
      <button
        type="button"
        className="btn btn-primary btn-lg btn-light center-button"
        onClick={() => props.onLogin(props)}
      >
        Login <img alt="" src={spotify_logo} height="25" width="25" />
      </button>
    </div>
  );
};

export default LoginPage;
