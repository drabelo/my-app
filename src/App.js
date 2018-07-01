import React, { Component } from "react";
import download from "downloadjs";
import logo from "./logo.svg";
import json from "format-json";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      token: ""
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleTokenChange = event => {
    this.setState({ token: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(`/url?url=${this.state.value}&token=${this.state.token}`, {
      method: "get"
    })
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
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Url</label>
            <input
              className="form-control"
              placeholder="Enter Url"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Token</label>
            <input
              class="form-control"
              placeholder="Enter Token"
              value={this.state.token}
              onChange={this.handleTokenChange}
            />
            <small id="emailHelp" class="form-text text-muted">
              Optional
            </small>
          </div>
          <button type="submit" class="btn btn-primary">
            Download
          </button>
        </form>
      </div>
    );
  }
}

export default App;
