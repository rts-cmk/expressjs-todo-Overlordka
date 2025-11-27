import cors from "cors"
import express from "express"
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

let todos = []
let nextId = 1


app.post ("/todos", (req, res) => {
    const { status, todo } = req.body 

    const newTodo = { id: nextId++, "status": status, "todo": todo }
    todos.push (newTodo)

    console.log(newTodo)

    res.json(newTodo)
})

app.get("/todos", (req, res) => {
  res.json(todos)
})

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id)

    todos = todos.filter(t => t.id !== id)
    res.json({ message: "Deleted", id})
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})