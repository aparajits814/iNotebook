const express = require('express');
const port = 5000;
const connectToMongo = require('./db.js');
const cors = require('cors');
const app = express();
connectToMongo();
app.use(cors());
app.use(express.json());
app.use('/api/v1', require('./Routes/Register.js'));
app.use('/api/v1', require('./Routes/Login.js'));
app.use('/api/v1',require('./Routes/AddNote.js'));
app.use('/api/v1',require('./Routes/FetchAllNotes.js'));
app.use('/api/v1',require('./Routes/UpdateNote.js'));
app.use('/api/v1',require('./Routes/DeleteNote.js'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})