import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Navbar";
import Navbar from "./components/Navbar";
import Playlist from "./components/Playlist";
import { createStore } from "redux";
import { Provider } from "react-redux";

const intialState = {
  videos: [
    "https://www.youtube.com/watch?v=MTTr7RGH37c",
    "https://www.youtube.com/watch?v=4yBrW0zG8y8"
  ],
  url: ""
};

const reducer = (state = intialState, action) => {
  if (action.type === "PLAY") {
    return {
      videos: state.videos,
      url: state.videos[0]
    };
  } else if (action.type === "NEXT") {
    if(!state.videos.includes(action.val)){
      return {
        
        url: state.videos[0],
        videos: state.videos
      };
    }
    else{
      return {
        url: state.videos[1],
        videos: state.videos.slice(1)
      };
    }
    
  } else if (action.type === "HANDLEINPUT") {
    if (state.videos.length <= 0) {
      return {
        url: "",
        videos: [action.value]
      };
    } else {
      return {
        videos: [...state.videos, action.value],
        url: state.url
      };
    }
  } else if (action.type === "DEL") {
    return {
      url: state.url,
      videos: state.videos.filter( (value, index, arr)=>{

        return index !== action.toDelete;
    
    })
    };
  } else {
    return state;
  }
};
const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Navbar />
          <Playlist />
        </div>
      </Provider>
    );
  }
}
