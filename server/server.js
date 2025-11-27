import cors from "cors"
import express from "express"
import fs from "fs"

let todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

function saveTodos() {
  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
}

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


app.post ("/todos", (req, res) => {
    const { status, todo } = req.body 

    const newTodo = { id: Date.now(), "status": status, "todo": todo }
    todos.push (newTodo)

    saveTodos()

    res.json(newTodo)
})

app.get("/todos", (req, res) => {
  res.json(todos)
})

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id)

    todos = todos.filter(t => t.id !== id)
    res.json({ message: "Deleted", id})

    saveTodos()
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})