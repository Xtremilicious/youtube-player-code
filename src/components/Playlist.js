import React, { Component } from "react";
import ReactPlayer from "react-player";
import "../App.css";
import { connect } from "react-redux";

class Playlist extends Component {
  render() {
    const videos = this.props.videos;
    const url = this.props.url;
    const play = () => {
      this.props.dispatch({ type: "PLAY" });
    };
    const next = url => {
      this.props.dispatch({ type: "NEXT", val: url });
    };
    const del = index => {
      this.props.dispatch({ type: "DEL", toDelete: index });
    };
    return (
      <div className="row player-container m-0">
        {videos.length <= 0 ? (
          <div className="col-8 p-0 empty">
            <div>Empty:(</div>
            <div>Add a few videos</div>
          </div>
        ) : url === "" ? (
          <div className="col-8 p-0 empty">
            <div>
              Click <i className="fa fa-play"></i>Play to start playing videos
            </div>
          </div>
        ) : (
          <ReactPlayer
            className="col-8 p-0 player"
            url={url}
            playing={true}
            controls={true}
            onEnded={() => next(url)}
          />
        )}

        <div className="col-4 playlist m-0 p-0">
          <div className="playlist-items">
            {videos.map((video, index) => {
              return (
                <div key={index} className="video-element row m-0 d-flex align-items-center">
                  <div className="col-6 link-title">Link {index + 1}</div>
                  <div className="col-6 d-flex justify-content-end"><button onClick={() => del(index)} className="del"><i className="fa fa-times"></i></button></div>
                </div>
              );
            })}
          </div>
          <div className="play-pause d-flex justify-content-center align-items-center">
            <button onClick={() => play()} className="play">
              <i className="fa fa-play"></i>Play Videos
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  videos: state.videos,
  url: state.url
});
export default connect(mapStateToProps)(Playlist);
