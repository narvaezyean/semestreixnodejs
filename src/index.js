const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan")

require ("dotenv").config()

const app = express();

//Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

app.get("/",(request, response)=>{
    response.send("Backend running...")
})

app.use("/api/boletines", require("./routes/boletin"))

const port = process.env.app_port

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})



