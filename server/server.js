import cors from "cors"
import express from "express"
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


app.post ("/todos", (req, res) => {
    const { status, todo } = req.body 

    console.log("Status:", status, "Todo:", todo)

    res.json({ status, todo })
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})