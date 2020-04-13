import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
		super();

		this.state = {
      screen: "",
      hiddenscreen: "",
      subscreen: "", 
      memory: "0",
      operatorIsApplied: false,
      sqrtIsApplied: false,
      parenthesesOpened: false,
    };
    
    this.inputValue = this.inputValue.bind(this);
    this.inputOperator = this.inputOperator.bind(this);
    this.inputSqrt = this.inputSqrt.bind(this);
    this.deleteValue = this.deleteValue.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.calcValue = this.calcValue.bind(this);
    this.addMemory = this.addMemory.bind(this);
    this.minusMemory = this.minusMemory.bind(this);
    this.clearMemory = this.clearMemory.bind(this);
  }

  inputValue(e){
    if(this.state.operatorIsApplied){
      this.setState({
        screen: ""
      });
      this.setState({
        screen: e.target.value,
        operatorIsApplied: false
      });
    }else{
      var input = this.state.screen + e.target.value;
      this.setState({
        screen: input,
      });
    }

    if(e.target.value == "("){
      this.setState({
        parenthesesOpened: true
      })
    }else if(e.target.value == ")"){
      this.setState({
        parenthesesOpened: false
      })
    }
  }

  inputOperator(e){
    
    if(this.state.sqrtIsApplied){
      this.setState({
        subscreen: this.state.subscreen + e.target.value,
        hiddenscreen: this.state.hiddenscreen + e.target.value,
        operatorIsApplied: true,
        sqrtIsApplied: false
      });
    }else{
      var input = this.state.screen + e.target.value;
      this.setState({
        subscreen: this.state.subscreen + input,
        hiddenscreen: this.state.hiddenscreen + input,
        operatorIsApplied: true
      }, () => {
        if(this.state.hiddenscreen !== "" && !this.state.parenthesesOpened){
          var toBeCalculated = this.state.hiddenscreen.substring(0, this.state.hiddenscreen.length - 1);
          var percent = toBeCalculated.replace(/%/g, "*0.01");
          var memory = percent.replace(/Mr/g, this.state.memory);
          var power = memory.replace(/\^/g, "**");
          var calculation = eval(power);
          this.setState({
            screen: calculation.toString()
          })
        }
      })
    }
  }

  inputSqrt(e){
    var input = e.target.value + "(" + this.state.screen + ")";
    var sqrt = parseInt(this.state.screen) **0.5;
    this.setState({
      subscreen: this.state.subscreen + input,
      hiddenscreen: this.state.hiddenscreen + sqrt.toString(),
      screen: sqrt.toString(),
      operatorIsApplied: true,
      sqrtIsApplied: true
    })
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
      subscreen: "",
      hiddenscreen: "",
      operatorIsApplied: false,
      sqrtIsApplied: false
    })
  }

  calcValue(){
    if(this.state.sqrtIsApplied){
      var toBeCalculated = this.state.hiddenscreen;
    }else{
      toBeCalculated = this.state.hiddenscreen + this.state.screen;
    }
    var percent = toBeCalculated.replace(/%/g, "*0.01");
    var memory = percent.replace(/Mr/g, this.state.memory);
    var power = memory.replace(/\^/g, "**");
    var calculation = eval(power);
    this.setState({
      screen: calculation.toString(),
      subscreen: "",
      hiddenscreen: ""
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
            <textarea className="subscreen" value={this.state.subscreen} readOnly></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <textarea className="screen" value={this.state.screen} readOnly></textarea>
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
            <input type="button" onClick={this.inputSqrt} className="btn btn-success mx-2" value ="√"/>
            <input type="button" onClick={this.inputValue} className="btn btn-success mx-2" value ="^"/>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="4"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="5"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="6"/>
            <input type="button" onClick={this.addMemory} className="btn btn-secondary mx-2" value ="M+"/>
            <input type="button" onClick={this.inputOperator} className="btn btn-success mx-2" value ="/"/>
            <input type="button" onClick={this.inputOperator} className="btn btn-success mx-2" value ="-"/>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="1"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="2"/>
            <input type="button" onClick={this.inputValue} className="btn btn-primary mx-2" value ="3"/>
            <input type="button" onClick={this.minusMemory} className="btn btn-secondary mx-2" value ="M-"/>           
            <input type="button" onClick={this.inputOperator} className="btn btn-success mx-2" value ="*"/>
            <input type="button" onClick={this.inputOperator} className="btn btn-success mx-2" value ="+"/>
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
