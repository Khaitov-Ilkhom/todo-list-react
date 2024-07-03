import "./TodoList.css"
import {useReducer, useRef} from "react";

const reducer = (state, action) => {
    console.log(action)
}

const TodoList = () => {
    const initialValue = {
        todo: []
    }
    const inputValue = useRef("")

    const [state, dispatch] = useReducer(reducer, initialValue)
    const formSubmit = (e) => {
        e.preventDefault()

        dispatch({type: "Todo", payload: inputValue.current.value})
    }

    console.log(state)

    return (
        <div className="todo-container">
            <div className="wrapper">
                <h2>Get Things Done !</h2>
                <form onSubmit={formSubmit} className="form">
                    <input ref={inputValue} className="input" type="text" placeholder="What is the task today?" required/>
                    <button type="submit" className="btn">Add Task</button>
                </form>
            </div>
            <div className="todo-list">

            </div>
        </div>
    )
}
export default TodoList
