import { ACTIONS } from "./App"

export default function FigureBtn({dispatch, figure}){
    return <button  
                onClick= {()=> dispatch({type: ACTIONS.ADD_FIGURE, payload:{figure}})}
                >
                {figure}
            </button>
}