const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});


