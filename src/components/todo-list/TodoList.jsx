import "./TodoList.css"
import {useReducer, useRef} from "react";
import {FaCheck} from "react-icons/fa";
import {MdDelete} from "react-icons/md";


const reducer = (state, action) => {
    switch (action.type) {
        case "TodoList":
            localStorage.setItem("Todo", JSON.stringify([...state.todo, action.value]))
            return {
                ...state,
                todo: [...state.todo, action.value]
            }
        default:
            return state
    }
}

const TodoList = () => {
    const initialValue = {
        todo: JSON.parse(localStorage.getItem("Todo")) || [],
        completed: false
    }
    const inputValue = useRef(null)

    const [state, dispatch] = useReducer(reducer, initialValue)
    const formSubmit = (e) => {
        e.preventDefault()
        const value = inputValue.current.value
        dispatch({type: "TodoList", value})

        inputValue.current.value = ''
    }
    const completedTodo = (i) => {

        console.log(i)
    }
    const deleteTodo = (i) => {
        console.log(i)
    }

    return (
        <div className="todo-container">
            <div className="wrapper">
                <h2>Get Things Done !</h2>
                <form onSubmit={formSubmit} className="form">
                    <input ref={inputValue} className="input" type="text" placeholder="What is the task today?"
                           required/>
                    <button type="submit" className="btn">Add Task</button>
                </form>
            </div>
            {
                state.todo ? state.todo.map((list, index) =>
                        <div key={index} className="todo-list">
                            <h2>{list}</h2>
                            <div className="buttons">
                                <button onClick={() => completedTodo(index)} className="completed"><FaCheck/></button>
                                <button onClick={() => deleteTodo(index)} className="delete"><MdDelete/></button>
                            </div>
                        </div>
                    ) :
                    <>
                    </>
            }
        </div>
    )
}
export default TodoList
