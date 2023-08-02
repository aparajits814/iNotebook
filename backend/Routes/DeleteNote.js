const express = require('express');
const router = express.Router();
const notes = require('../Schemas/Notes.js');
const jwt = require('jsonwebtoken');
const secret = "MERNSTACKINOTEBOOKPROJECT";

router.delete('/deletenote/:id', async (req, res) => {
    const token = req.header('authtoken');
    if (!token) {
        return res.status(400).json({ msg: "Authentication Error" });
    }
    const data = jwt.verify(token, secret);
    const user_id = data.user.id;
    await notes.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note Deleted!"});
});

module.exports = router;