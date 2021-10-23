express = require('express');
const router = express.Router();
const path = require('path');
const homePath = path.join(__dirname,'../','public','home');

roomIds = new Set();

router.get('/', (req,res)=>{
    res.sendFile(path.join(homePath,'home.html'))
});

router.get('/teacher', (req,res)=>{
    res.sendFile(path.join(homePath,'teacher.html'))
});

router.get('/student', (req,res)=>{
    res.sendFile(path.join(homePath,'student.html'))
});

router.get('/create', (req,res)=>{
    console.log("creating")
    taken = true
    id = Math.floor(Math.random() * 999999);
    while(roomIds.has(id)){
        id +=1;
    }
    roomIds.add(id)
    res.redirect(`/host/${id}`);
});

router.get('/host/:roomid', (req,res,next)=>{
    id = parseInt(req.params.roomid);
    console.log("trying to host")
    console.log(roomIds)
    if(roomIds.has(id)){
        return res.sendFile(path.join(homePath,'teacher.html'))
    }
    next()
});

router.get('/:roomid', (req,res,next)=>{
    id = parseInt(req.params.roomid);
    if(roomIds.has(id)){
        return res.sendFile(path.join(homePath,'student.html'))
    }
    next();
});

module.exports = router;