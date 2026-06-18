const express = require("express")
const app = express();
const cors = require('cors')
app.use(cors()) //allowing all regison future it need to be mast chanegs 
app.use(express.json())
const getAllid = require("./test")




app.post('/', async (req, res) => {
    // console.log(req.body.playlistUrl)
    const data = await getAllid();
    console.log(data)
    res.send(data)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})