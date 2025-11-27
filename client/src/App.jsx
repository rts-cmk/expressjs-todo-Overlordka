import { useEffect } from "react"
import { useState } from "react"

function App() {

  const [status, setStatus] = useState(false)
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


  return (
    <>
      <form>
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          placeholder="To Do"
        />
        <input
          type="checkbox"
          checked={status}
          onChange={e => setStatus(e.target.checked)}
        />

        <button onClick={sendRequest}>Send</button>
      </form>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.todo} - {t.status ? "done" : "not done"} <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
