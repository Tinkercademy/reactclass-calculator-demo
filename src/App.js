import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
		super();

		this.state = {
      screen: "", 
      memory: "0"
    };
    
    this.inputValue = this.inputValue.bind(this);
    this.deleteValue = this.deleteValue.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.calcValue = this.calcValue.bind(this);
    this.addMemory = this.addMemory.bind(this);
    this.minusMemory = this.minusMemory.bind(this);
    this.clearMemory = this.clearMemory.bind(this);
  }

  inputValue(e){
    var input = this.state.screen + e.target.value;
    this.setState({
      screen: input,
    });
  }

  deleteValue(){
    var lastchar = this.state.screen.charAt(this.state.screen.length - 1);
    if(lastchar == "r"){
      var input = this.state.screen.substring(0, this.state.screen.length - 2);
      this.setState({
        screen: input,
      });
    }else{
      var input = this.state.screen.substring(0, this.state.screen.length - 1);
      this.setState({
        screen: input,
      });
    }
  }

  clearScreen(){
    this.setState({
      screen: "",
    })
  }

  calcValue(){
    var percent = this.state.screen.replace(/%/g, "*0.01");
    var memory = percent.replace(/Mr/g, this.state.memory);
    var power = memory.replace(/\^/g, "**");
    var calculation = eval(power);
    this.setState({
      screen: calculation.toString()
    })
  }

  addMemory(){
    var memory = parseInt(this.state.memory) + eval(this.state.screen);
    this.setState({
      memory: memory.toString()
    })
  }

  minusMemory(){
    var memory = parseInt(this.state.memory) - eval(this.state.screen);
    this.setState({
      memory: memory.toString()
    })
  }

  clearMemory(){
    this.setState({
      memory: "0",
    })
  }

  render(){
    return (
      <div className="App pt-5">
          <h1 className="d-flex justify-content-center">Calculator</h1>

          <div className="d-flex justify-content-center mt-5">
            <textarea className="result" value={this.state.screen} readOnly></textarea>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <input type="button" onClick={this.clearScreen} className="btn btn-danger mx-2" value ="C"/>
            <input type="button" className="btn btn-primary mx-2 invisible"/>
            <input type="button" className="btn btn-primary mx-2 invisible"/>
            <input type="button" onClick={this.deleteValue} className="btn btn-warning mx-2" value ="DEL"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="("/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value =")"/>
          </div>         
          <div className="d-flex justify-content-center mt-2">
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="7"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="8"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="9"/>
            <input type="button" onClick={this.clearMemory} className="btn btn-secondary mx-2" value ="Mc"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="√"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="^"/>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="4"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="5"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="6"/>
            <input type="button" onClick={this.addMemory} className="btn btn-secondary mx-2" value ="M+"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="/"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="-"/>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="1"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="2"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="3"/>
            <input type="button" onClick={this.minusMemory} className="btn btn-secondary mx-2" value ="M-"/>           
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="*"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="+"/>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="00"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="0"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="."/>
            <input type="button" onClick={this.inputValue} className="btn btn-secondary mx-2" value ="Mr"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="%"/>
            <input type="button" onClick={this.calcValue} className="btn btn-success mx-2" value ="="/>
          </div>
      </div>
    );
  }
}

export default App;
