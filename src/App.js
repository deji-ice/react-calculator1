import { useReducer } from "react";
import "./styles.css"
import FigureBtn from "./FigureBtn";
import OperationBtn from "./OperationBtn";

export const ACTIONS ={
  ADD_FIGURE: "add-figure",
  CLEAR: "clear",
  DEL_FIGURE: "delete-figure",
  CHOOSE_OPERATION:'choose-operation',
  EVALUATE: 'evaluate'
}
function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_FIGURE:
      if( state.overwrite === true){
        return{
          ...state,
          currentOperand: payload.figure,
          overwrite: false
        }
      }
      if (payload.figure === "0" && state.currentOperand === "0"){
        return state;
      }
      if (payload.figure === "." && state.currentOperand.includes(".")) {
        return state
      }
      return{
        ...state,
        currentOperand: `${state.currentOperand || " "}${payload.figure}`
      }

    case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.prevOperand == null) {
          return state
        }
        if (state.prevOperand == null) {
          return{ 
            ...state,
            operation: payload.operation,
            prevOperand: state.currentOperand,
            currentOperand: null
          }
        }
        if (state.currentOperand == null) {
          return{
            ...state,
            operation: payload.operation,

          }
        }
        return{
          ...state,
          prevOperand: evaluate(state),
          currentOperand: null,
          operation: payload.operation
        }
    case ACTIONS.EVALUATE:
    if(state.operation == null || state.currentOperand == null || state.prevOperand== null){
      return state
    }
    return{
      ...state,
      prevOperand: null,
      currentOperand: evaluate(state),
      operation: null,
      overwrite: true
    }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DEL_FIGURE:
      if(state.overwrite){
        return{
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.lenght === 1){
        return{
          ...state,
          currentOperand: null
        }
      }
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      } 
    }

    
}

function evaluate({currentOperand, prevOperand, operation}){
    const current = parseFloat(currentOperand)
    const prev= parseFloat(prevOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let calculation = ""
    switch (operation) {
      case '+':
        calculation = prev + current
        break;
      case '-':
        calculation = prev - current
        break;
      case '*':
        calculation = prev * current
        break;
      case "÷":
        calculation = prev / current
        break;
    }
    return calculation.toString()
}

const INTERGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand == null) return
  const [interger, decimal] = operand.split(".")
  if (decimal == null) return INTERGER_FORMATTER.format(interger)
  return `${INTERGER_FORMATTER.format(interger)}.${decimal}`
}

function App() {
  const [{currentOperand, prevOperand, operation}, dispatch] = useReducer(
    reducer,
    {})

  return (
    <div className="calculator-grid">
    <div className="output">
      <div className="prev-operand">{formatOperand (prevOperand)} {operation}</div>
      <div className="current-operand">{formatOperand (currentOperand)}</div>
    </div>
    <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
    <button onClick={() => dispatch({type: ACTIONS.DEL_FIGURE})}>DEL</button>
    <OperationBtn operation= "÷" dispatch={dispatch}/>
    <FigureBtn figure= "1" dispatch={dispatch}/>
    <FigureBtn figure= "2" dispatch={dispatch}/>
    <FigureBtn figure= "3" dispatch={dispatch}/>
    <OperationBtn operation= "*" dispatch={dispatch}/>
    <FigureBtn figure= "4" dispatch={dispatch}/>
    <FigureBtn figure= "5" dispatch={dispatch}/>
    <FigureBtn figure= "6" dispatch={dispatch}/>
    <OperationBtn operation= "-" dispatch={dispatch}/>
    <FigureBtn figure= "7" dispatch={dispatch}/>
    <FigureBtn figure= "8" dispatch={dispatch}/>
    <FigureBtn figure= "9" dispatch={dispatch}/>
    <OperationBtn operation= "+" dispatch={dispatch}/>
    <FigureBtn figure= "." dispatch={dispatch}/>
    <FigureBtn figure= "0" dispatch={dispatch}/>
    <button className="span-two"  onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    



    </div>
  );
}

export default App;
