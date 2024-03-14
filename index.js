const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


const castMembers = require('./data/rhcast');
const stats = require('./data/rhstats');
const tagLines = require('./data/rhtaglines');

//MiddleWare- Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))




//*****************Root Route*****************************************
app.get("/", (req, res) =>{
  res.send('Server is Live')
})

//*********************Get all Castmembers*************************************
app.get("/api/castMembers", (req, res) =>{
  res.json(castMembers);
  
});

//*********************Get by castmembers by cast ID**************************
app.get("/api/castMembers/:id", (req, res, next) =>{
  const castMember = castMembers.find((c)=> c.id == req.params.id)
  if(castMember) res.json(castMember)
  else next()
});



//********************Post -Create new cast member******************************
app.post('/api/castMembers', (req, res) =>{
  if(req.body.fName && req.body.lName && req.body.city) {
    if(castMembers.find((c) => c.fName == req.body.fName)) {
      res.json({error:`Housewife already exsists`});
      return;
    }
    const newCastMember ={
      id: castMembers[castMembers.length - 1].id + 1,
      fName: req.body.fName,
      lName: req.body.lName,
      city: req.body.city
    };
    castMembers.push(newCastMember);
    res.json(castMembers[castMembers.length - 1])
  }else {
    res.json({error:`To add new housewife, please enter Housewife fName, lName, and city`});
  }
  });

//********************Delete cast member by id**************************************

app.delete("/api/castMembers/:id", (req, res) =>{
  const castMember = castMembers.find((c, i)=>{
    if (c.id == req.params.id){
      castMembers.splice(i, 1);
      return true;
    }
  });
  res.json({message:`Castmember as been deleted`});
});



//****************************Get all stats*******************************
app.get("/api/stats", (req , res) =>{
  res.json(stats);
})

//***********************Get stats by cast memeber name*************************
app.get("/api/stats/:Name", (req, res) =>{
  const stat = stats.find((f)=> f.Name == req.params.Name)
  if(stat) res.json(stat)
  else res.json({error:`No information exists for that name`});
})


//***************************Get all taglines********************************
app.get("/api/tagLines", (req , res) =>{
  res.json(tagLines);
})

//**************************Get tag lines by person who said it********************************
app.get("/api/tagLines/:whoSaidIt", (req, res) =>{
  const tagLine = tagLines.find((t)=> t.whoSaidIt == req.params.whoSaidIt)
  if(tagLine) res.json(tagLine)
  else res.json({error:`Who said that...? We have no idea, try again!`});
})


//***********Created Server************************
app.listen(port, () =>{
  console.log(`server is listening on port: ${port}`);
});

// ****************MIDDLEWARE**************************
app.use((req, res) =>{
  res.status(404)
  res.json({Error: `resource not found`})
})