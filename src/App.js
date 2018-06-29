import React, { Component } from "react";
import download from "downloadjs";
import logo from "./logo.svg";
import json from "format-json";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(
      `https://testingappforrichard.herokuapp.com/url?url=${this.state.value}`,
      {
        method: "get"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        download(
          json.plain(responseJson.results),
          "download.json",
          "text/plain"
        );
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <label>
              Url:
              <input
                type="text"
                name="name"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </p>
      </div>
    );
  }
}

export default App;
