import { useEffect } from "react"
import { useState } from "react"
import "./App.sass"

function App() {

  const [status, setStatus] = useState("not done")
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])


  async function loadData() {
    const response = await fetch("/todos")

    const data = await response.json()
    setTodos(data)
    console.log(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function sendRequest(event) {
    event.preventDefault()
    if (todo == "") {

    } else {
      const response = await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status, todo })
      })

      await response.json()
    }


    loadData()

    setStatus(false)
    setTodo("")
  }

  async function deleteTodo(id) {
    await fetch(`/todos/${id}`, {
      method: "DELETE"
    })

    loadData()
  }

  async function updateStatus(id, newStatus) {
    const response = await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus})
    })

    const updated = await response.json()

    setTodos(todos.map(t => (t.id === id ? updated : t)))
  }


  return (
    <>
      <form>
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          placeholder="To Do"
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="not done">Not done</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={sendRequest}>Send</button>
      </form>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.todo}
            <select onChange={(e) => updateStatus(t.id, e.target.value)}>
              <option value="not done">Not done</option>
              <option value="in progress">In progress</option>
              <option value="done">Done</option>
            </select>
            {t.status} <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
