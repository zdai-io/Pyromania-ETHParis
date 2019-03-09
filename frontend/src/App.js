import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
var tokenList = require('./json/tokens.json'); 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: tokenList,
      selectedToken: "0x000",
      tokenAmount: 0,
      resultAmount: 0,
    };

    this.handleChange = this.handleChange.bind(this);

    this.isWeb3 = true; //If metamask is installed  
    this.isWeb3Locked = false; //If metamask account is locked
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  Burn() {
    alert("Burn");
  }

  Unlock() {

    alert("unlock");
  }

  getTokenList() {
    var fs = require('fs');
    const tokens = JSON.parse(fs.readFileSync('json/tokens.json', 'utf8'));

    this.state.tokens = tokens;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
          crossorigin="anonymous"></link>
          <div className="container">
            <div className="row fixed-top Brand">
              <div className="col">
                <h1>Pyrotoken</h1>
                <h2>Moto</h2>
              </div>
            </div>
            <div className="row position-relative TokenBurner">
              <div className="col">
                <select value={this.state.selectedToken} 
                  onChange={(e) => this.setState({selectedToken: e.target.value})}>
                  {this.state.tokens.map((token) => <option key={token.address} value={token.address}>{token.name}</option>)}
                </select>
              </div>
              <div className="col">
                <input type="text" name="tokenAmount" value={this.state.tokenAmount} onChange={this.handleChange}/>
              </div>
              <div className="col">
                <input type="button" value="Unlock" onClick={()=>this.Unlock()}/>
              </div>
              <div className="col">
                <p> -> </p>
              </div>
              <div className="col">
                <input type="text" name="resultAmount" value={this.state.resultAmount} onChange={this.handleChange}/>
              </div>
              <div className="col">
                <p>PTK</p>
              </div>
              <div className="col">
                <input type="button" value="Burn" onClick={()=>this.Burn()}/>
              </div>
            </div>
            <div className="row Raiting">
              <div className="col">
                <table>
                  <th></th>
                </table>
              </div>
            </div>
          </div>
          

          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
            crossorigin="anonymous"></script>
            
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" 
            integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" 
            crossorigin="anonymous"></script>
            
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" 
            integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" 
            crossorigin="anonymous"></script>

        </header>
      </div>
    );
  }
}

export default App;
