import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
  }
  state = {
    input: ""
  };

  updateInput = event => {
    event.preventDefault();
    const query = event.target.value;
    this.setState(() => {
      return {
        input: query
      };
    });
  };

  handleInput = query => {
    let regex = /^(http(s)??:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/;
    let result = regex.test(query);
    if (result === false) {
      this.setState({
        input: "Invalid URL!"
      });
    } else if (this.props.videos.includes(query)) {
      this.setState({
        input: "Duplicate URL!"
      });
    } else {
      this.props.dispatch({ type: "HANDLEINPUT", value: query });
    }
  };

  render() {
    return (
      <nav className="navbar row link-bar m-0">
        <div className="col-6 title-text d-flex justify-content-end">
          Add a YouTube Link:{" "}
        </div>
        <div className="col-6">
          <div className="input-bar">
            <input
              className="input-area"
              type="text"
              value={this.state.input}
              onChange={this.updateInput}
            ></input>
            <button
              className="add-button"
              onClick={() => this.handleInput(this.state.input)}
            >
              Add
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos
});
export default connect(mapStateToProps)(Navbar);
