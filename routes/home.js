express = require('express');
const router = express.Router();
const path = require('path');
const homePath = path.join(__dirname,'../','public','home');

router.get('/', (req,res)=>{
    res.sendFile(path.join(homePath,'home.html'))
});

router.get('/teacher', (req,res)=>{
    res.sendFile(path.join(homePath,'teacher.html'))
});

router.get('/student', (req,res)=>{
    res.sendFile(path.join(homePath,'student.html'))
});

module.exports = router;