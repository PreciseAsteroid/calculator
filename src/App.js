import React, { Component } from 'react';
import logo from './logo.svg';
import logo_bg from './react-logo-w-bg.svg';
import js_logo from './js.svg';
import './App.css';

import {firstNumberAppState} from './AppState.js';

// state machine values
// const SM_FIRST = 'first';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modeState: new firstNumberAppState(this),
      display: 0,
      result: 0,
      resultArray:[],
      operand:  "0",
      operandDec: false,
      operator: null,
      secOperand: "0",
      secOperandDec: false,
    };
    // bind functions to class => needed if you want to reference the component with this
    this.onDigitClick = this.onDigitClick.bind(this);
    this.onEqualClick = this.onEqualClick.bind(this);
    this.onOpClick = this.onOpClick.bind(this);
    this.onDecimalClick = this.onDecimalClick.bind(this);
    this.onPctClick = this.onPctClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
  }
  onDigitClick(event){
    console.log('event.target.value',event.target.value);
    this.state.modeState.digit(event.target.value);
  }
  onEqualClick(){
    this.state.modeState.equal();
  }

  onOpClick(event){
    this.state.modeState.operator(event.target.value);
  }
  onDecimalClick(){
    this.state.modeState.decimal();
  }
  onPctClick(){
    this.state.modeState.pct();
  }
  onClearClick(){
    this.state.modeState.clear();
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>The Calculator</h2>
        </div>
        <div className='Calculator'>
          <Results className='display header' result={this.state.display}/>

          <Results className='result' result={this.state.result}/>

          <Results className='operand' result={this.state.operand}/>

          <Results className='operator' result={this.state.operator}/>

          <Results className='secOperand' result={this.state.secOperand}/>

          <Button
            value='C'
            type='text'
            className='clear btn btn-control'
            onClick={this.onClearClick}
          />
          <Button
            value='/'
            onClick={this.onOpClick}
            className ='btn'
          />
          <Button
            value='X'
            onClick={this.onOpClick}
            className ='btn'
          />

          <Button
            value='7'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />
          <Button
            value='8'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />
          <Button
            value='9'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />
          <Button
            value='-'
            onClick={this.onOpClick}
            className ='btn'
          />

          <Button
            value='4'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />
          <Button
            value='5'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />
          <Button
            value='6'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />

          <Button
            value='+'
            onClick={this.onOpClick}
            className ='btn'
          />

          <Button
            value='1'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />
          <Button
            value='2'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />
          <Button
            value='3'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />

          <Button
            value='='
            onClick={this.onEqualClick}
            className = 'equal btn'
          />

          <Button
            value='0'
            type='number'
            onClick={this.onDigitClick}
            className ='btn'
          />

          <Button
            value='.'
            onClick={this.onDecimalClick}
            className ='btn'
          />

          <Button
            value='%'
            onClick={this.onPctClick}
            className ='btn'
          />

      </div>
      <div className="App-footer">
        <h3>Technologies & Concepts</h3>
        <div className='logo-items'>
          <img src={js_logo} alt="js_logo" className='logo-item' />
          <img src={logo_bg} alt="logo" className='logo-item' />
          <div className='logo-item text-logo'>
            <h5>State Design Pattern</h5>
          </div>
          <div className='logo-item text-logo'>
            <h5>CSS Grid Layout</h5>
          </div>

        </div>
      </div>
    </div>
    );
  }
}

class Button extends Component{

  render(){
    const {
      onClick,
      className ='',
      type='',
      value,
      children,
    } = this.props;
    return (
      <button
        onClick={onClick}
        type={type}
        className={className}
        value={value}
        >
        {value}
      </button>
    )
  }
}

const Results = ({result, className}) => {
  // const {result} = this.props;
  return(
    <p className = {className}>{result}</p>
  );
}

export default App;
export {
  Button,
  Results,
};
