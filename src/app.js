const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); 


app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
const educationRoutes = require('./routes/educationRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const certificationsRoutes = require('./routes/certificationsRoutes');


app.use('/user', userRoutes);
app.use('/education', educationRoutes);
app.use('/experience', experienceRoutes);
app.use('/skills', skillsRoutes);
app.use('/projects', projectsRoutes);
app.use('/certifications', certificationsRoutes);

app.get("/", (req, res) => {
  res.send("API está online!");
});


module.exports = app;
