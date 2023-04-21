require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

const start = (PORT:any) => {
    try {
        app.listen(PORT,() => {
            console.log(`Server was started, and is running on PORT: ${PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}
start(process.env.PORT)


