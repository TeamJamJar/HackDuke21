express = require('express');
const router = express.Router();
const path = require('path');
const homePath = path.join(__dirname,'../','public','home');

router.get('/', (req,res)=>{
    res.sendFile(path.join(homePath,'home.html'))
});

module.exports = router;