// TODO: support %

class AppState { // abstract
  constructor() {
    this.name = 'abstractState';
  }
    digit(digit){}
    operator(operator){}
    equal(){}
    clear(){}
    decimal(){}
    pct(){}
    // addDigitToNum(digit,target,targetArray,targetDecState){
    addDigitToNum(digit,target,targetDecState){
      let updatedTarget = this.app.state[target];
      // check if in initial state
      if (updatedTarget == "0") {
        updatedTarget = digit;
      } else {
        updatedTarget += digit;
      }
      // check if digit limit was reached
      // if (updatedTarget.length > 9) {
        // console.log('digit limit reached');
        // this.clear();
      // } else {
        this.app.setState({
          [target]: updatedTarget,
        });
      // }

    }
    addDecToNum(target,targetDecState){
      let updatedTarget = this.app.state[target];
      if (!this.app.state[targetDecState]) {
        updatedTarget += '.';
        this.app.setState({
          [target]: updatedTarget,
          display: updatedTarget,
          [targetDecState]: true,
        })
      }
    }
    clear(){
      console.log('clear');
      this.app.setState({
        modeState: new firstNumberAppState(this.app),
        display: 0,
        result: 0,
        resultArray:[],
        operand:  "0",
        operandDec: false,
        operator: null,
        secOperand: "0",
        secOperandDec: false,
      });
    }

}

class firstNumberAppState extends AppState {
  constructor(App) {
    super();
    this.name = 'firstNumber';
    this.app = App;
    console.log('App', App);

  }

  digit(digit){
    // state will not change. value will be processes;
    this.addDigitToNum(digit,'operand');
    // function approach to solve async issue with setState that was changed in addDigitToNum
    this.app.setState((prevState) => {
      const {operand} = prevState;
      return {display: operand}
      } );
  }
  decimal(){
    this.addDecToNum('operand','operandDec');
  }

  equal(){
    // nullify first operand and keep as is
    this.app.setState({
      operand: "0",
    })
  }

  operator(operator){
    // store operation and change mode to secondOperand
    // if (this.app.state.operand !== "0") {
      this.app.setState({
        operator: operator,
        modeState: new secondNumberAppState(this.app),
        secOperand: '',
      })
    // } else { // dont change state
      // this.app.setState({
      //   operator: operator,
      // })
    // }
  }
  pct(){
    let calc = this.app.state.operand / 100;
    this.app.setState({
      display: calc,
      operand: calc,
    });
  }
  // clear(){
  //   super.clear();
  // }

}

class secondNumberAppState extends AppState {
  constructor(App) {
    super();
    this.name = 'secondNumber';
    this.app = App;
    console.log('App', App);
  }

  digit(digit){
    // state will not change. value will be processes;
    this.addDigitToNum(digit,'secOperand');
    // function approach to solve async issue with setState that was changed in addDigitToNum
    this.app.setState((prevState) => {
      const {secOperand} = prevState;
      return {display: secOperand}
      } );
  }

  decimal(){
      this.addDecToNum('secOperand','secOperandDec');

  }

  equal(){
    var calc;
    let operand = parseFloat(this.app.state.operand);
    let secondOperand = parseFloat(this.app.state.secOperand);

    switch (this.app.state.operator) {
      case '+':
        calc = operand + secondOperand
        break;
      case '-':
        calc = operand - secondOperand
        break;
      case 'X':
        calc = operand * secondOperand
        break;
      case '/':
        calc = operand / secondOperand
        break;
      case '%':
        calc = operand % secondOperand
        break;
      default:

    }
    console.log('equal changing state`');
    this.app.setState({
      display: calc,
      result: calc,
      operand: calc.toString(),
      operator: null,
      modeState: new firstNumberAppState(this.app),
    });

  }

  operator(operator){
    // hitting another operator without hitting equal first
    this.equal();
    this.app.setState({
      operator: operator,
      modeState: new secondNumberAppState(this.app),
      secOperand: '',
      });

  }
  pct(){
    let calc = this.app.state.secOperand / 100;
    this.app.setState({
      display: calc,
      secOperand: calc,
    });
  }
}


// export default FirstOperand;
export {
  firstNumberAppState,
  secondNumberAppState,
};
