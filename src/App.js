import React, {useState} from "react";
import "./App.css"

export default function App(){

  const [todoData, setTododata] = useState([])
  const [value, setValue] = useState("")

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius:"50%",
    cursor:"pointer",
    float:"right"
  }

  const listStyle = (completed) => {
    return{
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  }

  const handleClick = (id) => {
    let newTodoData = todoData.filter((data)=> data.id !== id)
    setTododata(newTodoData);
  };

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    setTododata(prev =>
      [...prev, newTodo]
    )
  }

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id){
        data.completed = !data.completed
      }
      return data
    })
    setTododata(newTodoData)
  }

  return(
    <div className="container"> 

      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <form style={{display: "flex"}} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{flex: "10", padding: "5px"}}
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="입력"
            className="btn"
            style={{flex:"1"}}
          />
        </form>

        {todoData.map((data) => (
          <div style={listStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={data.completed} onClick={() => handleCompleteChange(data.id)}/>
            {data.title}
            <button style={btnStyle} onClick={() => handleClick(data.id)}>x</button>
          </div>
        ))}
        
      </div> 

    </div>
  )
}