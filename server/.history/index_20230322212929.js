require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let users = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 22 },
];

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