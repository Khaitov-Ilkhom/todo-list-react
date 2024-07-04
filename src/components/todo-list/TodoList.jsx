import "./TodoList.css"
import {useReducer, useRef} from "react";
import {FaCheck} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";


const reducer = (state, action) => {
    switch (action.type) {
        case "TodoList": {
            const newTask = {
                id: state.length + 1,
                title: action.payload,
                complete: false
            };
            const res = [...state, newTask]
            localStorage.setItem("todo", JSON.stringify(res))
            return res
        }
        case "DeleteTodo": {
            const removeTodo = state.filter(task => task.id !== action.payload)
            localStorage.setItem("todo", JSON.stringify(removeTodo))
            return removeTodo
        }
        case "Complete": {
            const complete = state.map(todo => todo.id === action.payload ? {...todo, complete: !todo.complete} : todo)
            localStorage.setItem("todo", JSON.stringify(complete))
            return complete
        }
        default: return state
    }
}

const TodoList = () => {
    const initialValue = JSON.parse(localStorage.getItem("todo")) || []
    const inputValue = useRef(null)

    const [state, dispatch] = useReducer(reducer, initialValue)
    const formSubmit = (e) => {
        e.preventDefault()
        dispatch({type: "TodoList", payload: inputValue.current.value})

    }

    const deleteTodo = (id) => {
        dispatch({type: "DeleteTodo", payload: id})
    }
    const completeTodo = (id) => {
        dispatch({type: "Complete", payload: id})
    }

    return (
        <div className="todo-container">
            <div className="wrapper">
                <h2>Get Things Done !</h2>
                <br/>
                <h3 style={{color: "white"}}> Task amount: {state.length}</h3>
                <br/> <br/>
                <form onSubmit={formSubmit} className="form">
                    <input ref={inputValue} className="input" type="text" placeholder="What is the task today?"
                           required/>
                    <button type="submit" className="btn">Add Task</button>
                </form>
            </div>
            {
                state.map(todo =>
                    <div key={todo.id} className="todo-list">
                        <h2>{todo.title}</h2>
                        <div className="buttons">
                            <button onClick={() => completeTodo(todo.id)} className="completed">
                                <FaCheck style={todo.complete ? {display: "none"} : {display: "block"}}/>
                                <FaCheckDouble style={todo.complete ? {display: "block"} : {display: "none"}}/>
                            </button>
                            <button onClick={() => deleteTodo(todo.id)} className="delete"><MdDelete/></button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default TodoList
