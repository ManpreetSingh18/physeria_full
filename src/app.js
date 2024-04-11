// module
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const conn = require("./db/mongodb");
const Register = require("./models/registers");
const OhmsLaw = require("./models/ohms");
const Crystal = require("./models/crystal");
const EnergyEquivalence = require("./models/energyEquivalence");
const MeterBridge = require("./models/meterBridge");
const SeriesResistance = require("./models/seriesResistance");
const CompareEmf = require("./models/compareEmf");
const DensitySonometer = require("./models/densitySonometer");
const ThicknessSheet = require("./models/thicknessSheet");
const TwoJunction = require("./models/twoJunction");
//var popup = require('popups');

const bcrypt = require("bcrypt");
var session = require("express-session");
// Creating express object
const app = express();

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../public/templates/views");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: "patiotsa",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  }else{
    res.render("home");
  }
  
});
//list of expreriments
app.get("/exp", (req, res) => {
  if (req.session.user) {
    res.render("exp", { user: req.session.user });
  }else{
    res.render("exp");
  }
});
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.render("login", { user: req.session.user });
  }else{
    res.render("login");
  }
});
app.get("/signup", (req, res) => {
  if (req.session.user) {
    res.render("signup", { user: req.session.user });
  }else{
    res.render("signup");
  }
});

// app.get("/home", (req, res) => {
//   res.render("home")
// })

app.get("/p1", (req, res) => {
  if (req.session.user) {
    res.render("p1");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});
app.get("/p2", (req, res) => {
  if (req.session.user) {
    res.render("p2");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});

app.get("/p3", (req, res) => {
  if (req.session.user) {
    res.render("p3");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});
app.get("/p4", (req, res) => {
  if (req.session.user) {
    res.render("p4");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});
app.get("/p5", (req, res) => {
  if (req.session.user) {
    res.render("p5");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});
app.get("/p5", (req, res) => {
  if (req.session.user) {
    res.render("p5");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});

app.get("/p6", (req, res) => {
  if (req.session.user) {
    res.render("p6");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});

app.get("/p7", (req, res) => {
  if (req.session.user) {
    res.render("p7");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});

app.get("/p8", (req, res) => {
  if (req.session.user) {
    res.render("p8");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});

app.get("/p9", (req, res) => {
  if (req.session.user) {
    res.render("p9");
  } else {
    res.render("exp", { message: "Please Login to access practicals" });
  }
});

app.post("/signup", async (req, res) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const registerUser = new Register({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const registered = await registerUser.save();
    req.session.user = {
      name: req.body.name,
      email: req.body.email,
      // Add other user properties if needed
    };
    res.render("exp");
  } catch (error) {
    console.log("Error in signing in:", error.message);
    res.render("signup", { error:"Error Occured .Email might be dupliacate" });
    //res.send("Error in signup");
  }
  
  //const registered = await registerUser.save();
  //res.send("Registered Successfully");
  //alert("Registered Successfully");

  
});

app.post("/login", async (req, res) => {
  try {
    const check = await Register.findOne({
      email: req.body.email,
    });
    const match = await bcrypt.compare(req.body.password, check.password);
    if (!match) {
      res.render("login", { error: "Wrong Password Entered" });
    } 
    
    if (match) {
      // Store user information in session
      req.session.user = {
        name: check.name,
        email: check.email,
        // Add other user properties if needed
      };
      res.render("home", { user: req.session.user });
    } 
    // else {
    //   res.send("Please login to access this page");
    // }

  

    // if (check.password === req.body.password) {
    //   res.render("proceed");
    // } else {
    //   res.send("Wrong password")
    // }
  } catch (error) {
    //console.error(error);
    res.render("login", { error: "Error in signup" });
  }
});

// adding data to database

// for p1
app.post("/p1", async (req, res) => {
  const crystal = new Crystal({
    disprobe: req.body.disprobe,
    thickness: req.body.thickness,
    current: req.body.current,
    thermometer: req.body.thermometer,
    voltage: req.body.voltage,
    temperature: req.body.temperature,
  });
  // //giving data to mongo db
  const data_added = await crystal.save();
});

// for p2
app.post("/p2", async (req, res) => {
  const ohms = new OhmsLaw({
    resistance: req.body.resistance,
    voltage: req.body.voltage,
  });
  // //giving data to mongo db
  const data_added = await ohms.save();
});
// for p3
app.post("/p3", async (req, res) => {
  const energyEquivalence = new EnergyEquivalence({
    speedOfLight: req.body.speedOfLight,
    mass: req.body.mass,
  });
  // //giving data to mongo db
  const data_added = await energyEquivalence.save();
});

// for p4
app.post("/p4", async (req, res) => {
  const meterBridge = new MeterBridge({
    diameter: req.body.diameter,
    resistance: req.body.resistance,
    length: req.body.length,
  });
  // //giving data to mongo db
  const data_added = await meterBridge.save();
});

// for p5
app.post("/p5", async (req, res) => {
  try {
    const seriesResistance = new SeriesResistance({
      resistance: req.body.resistance,
      balance: req.body.balance,
    });
    // //giving data to mongo db

    const data_added = await seriesResistance.save();
  } catch (error) {
    console.log("Error in databse of P5", error.message);
  }
});

// for p6
app.post("/p6", async (req, res) => {
  const compareEmf = new CompareEmf({
    l1: req.body.l1,
    l2: req.body.l2,
  });
  // //giving data to mongo db
  const data_added = await compareEmf.save();
});

// for p7
app.post("/p7", async (req, res) => {
  const densitySonometer = new DensitySonometer({
    l1: req.body.l1,
    l2: req.body.l2,
  });
  // //giving data to mongo db
  const data_added = await densitySonometer.save();
});

// for p8
app.post("/p8", async (req, res) => {
  const thicknessSheet = new ThicknessSheet({
    leastcount: req.body.leastcount,
    zeroerror: req.body.zeroerror,
    linearscale: req.body.linearscale,
    circularscale: req.body.circularscale,
  });
  // //giving data to mongo db
  const data_added = await thicknessSheet.save();
});

// for p9
app.post("/p9", async (req, res) => {
  const twoJunction = new TwoJunction({
    emf: req.body.emf,
    resistance_potentiometer: req.body.resistance_potentiometer,
    resistance_resistancebox: req.body.resistance_resistancebox,
    length_potentiometer: req.body.length_potentiometer,
    temperature: req.body.temperature,
    length: req.body.length,
  });
  // //giving data to mongo db
  const data_added = await twoJunction.save();
});
app.listen(3000, () => {
  console.log("Port Connected");
});
