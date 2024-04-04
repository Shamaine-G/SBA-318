require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to datbase"));



//***SCHEMA'S************
const castMembers = require("./models/castMemberModel");
const castTaglines = require("./models/castTaglineModel");
const castStats = require("./models/castStatModel");


// MiddleWare- 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))
app.use(express.json());



// //*****************Root Route*****************************************
app.get("/", (req, res) => {
  res.send("Server is Live");
});

// //*********************Get all *************************************


app.get("/castMembers", async (req, res) => {
  try {
    const castmembers = await castMembers.find({});
    res.status(200).json(castmembers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/castStats", async (req, res) => {
  try {
    const caststats = await castStats.find({});
    res.status(200).json(caststats);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/castTaglines", async (req, res) => {
  try {
    const casttaglines = await castTaglines.find({});
    res.status(200).json(casttaglines);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});



//*********************Get One**************************

app.get("/castMembers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const castmember = await castMembers.findById(id)
    res.status(200).json(castmember);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
}
})


app.get("/castStats/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const caststat = await castStats.findById(id)
    res.status(200).json(caststat);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
}
})


app.get("/castTaglines/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const casttagline = await castTaglines.findById(id)
    res.status(200).json(casttagline);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
}
})

 

// //********************Post -Create One******************************
app.post("/castMembers", async (req, res) => {
  try {
    const cast = await castMembers.create(req.body);
    res.status(200).json(cast);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/castStats", async (req, res) => {
  try {
    const castStat = await castStats.create(req.body);
    res.status(200).json(castStat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/castTaglines", async (req, res) => {
  try {
    const castTagline = await castTaglines.create(req.body);
    res.status(200).json(castTagline);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


// ***************************Update******************************
app.patch("/castMembers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatecastmember = await castMembers.findByIdAndUpdate(id, req.body);
    if (!updatecastmember) {
      return res.status(404).json({ message: `Cast Member does not exist in our database` });
    }
    const updatedcastmember = await castMembers.findById(id);
    res.status(200).json(updatedcastmember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/castStats/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatestats = await castStats.findByIdAndUpdate(id, req.body);
    if (!updatestats) {
      return res.status(404).json({ message: `Cast Member Stats don't exist in our database` });
    }
    const updatedstats = await castStats.findById(id);
    res.status(200).json(updatedstats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/castTaglines/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatetagline = await castTaglines.findByIdAndUpdate(id, req.body);
    if (!updatetagline) {
      return res.status(404).json({ message: `Who said that?, try again` });
    }
    const updatedtagline = await castTaglines.findById(id);
    res.status(200).json(updatedtagline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//********************Delete*************************************


app.delete('/castMembers/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const castmember = await castMembers.findOneAndDelete(id);
    if(!castmember) {
      return res.status(404).json({message: `cannot find CastMember ${castmember}`})
    }
    res.status(200).json({message:`${castmember} has been deleted from database`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.delete('/castStats/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const caststat = await castStats.findOneAndDelete(id);
    if(!caststat) {
      return res.status(404).json({message: `cannot find CastMember Stats for ${caststat}`})
    }
    res.status(200).json({message:`${caststat} has been deleted from database`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


app.delete('/castTaglines/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const casttagline = await castTaglines.findOneAndDelete(id);
    if(!casttagline) {
      return res.status(404).json({message: `cannot find tagline for  ${casttagline}`})
    }
    res.status(200).json({message:`Cast tagline for ${casttagline} has been deleted from database`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


//***********Created Server************************
app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});

// ****************MIDDLEWARE**************************
app.use((req, res) => {
  res.status(404);
  res.json({ Error: `resource not found` });
});
