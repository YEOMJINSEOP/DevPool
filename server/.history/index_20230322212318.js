require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.get("/users", (req, res) => {
  res.json(users);
});

const port = process.env.PORT || 5009;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})