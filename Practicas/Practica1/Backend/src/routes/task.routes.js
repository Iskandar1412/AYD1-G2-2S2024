const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Node APP is running')
});

module.exports = router;