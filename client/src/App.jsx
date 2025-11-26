import { useState } from "react"

function App() {

  const [status, setStatus] = useState(false)
  const [todo, setTodo] = useState("")

  async function sendRequest() {
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status, todo })
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <>
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
    </>
  )
}

export default App
