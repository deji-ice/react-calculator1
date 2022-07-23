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
      if (payload.figure === "0" && state.currentOperand === "0"){
        return state
      }
      if (payload.figure === "." && state.currentOperand.includes(".")) {
        return state
      }
      return{
        ...state,
        currentOperand: `${state.currentOperand || " "}${payload.figure}`
      }
    }
}

function App() {
  const [{currentOperand, prevOperand, operation}, dispatch] = useReducer(
    reducer,
    {})

  return (
    <div className="calculator-grid">
    <div className="output">
      <div className="prev-operand">{prevOperand} {operation}</div>
      <div className="current-operand">{currentOperand}</div>
    </div>
    <button className="span-two" onClick={() => dispatch()}>AC</button>
    <button>DEL</button>
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
    <button className="span-two">=</button>
    



    </div>
  );
}

export default App;
