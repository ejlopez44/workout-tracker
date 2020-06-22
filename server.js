const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// HTML Routes (Are these actually needed?)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/exercise', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
});

app.get('/stats', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/stats.html'));
});



// API Routes

// Post new workout (/api/workouts)
app.post('/api/workouts', (req, res) => {
    console.log(req.body)
    db.Workout.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(err);
        });
})

// Find all workouts
app.get('/api/workouts/range', (req, res) => {
    db.Workout.find()
        .then(data => {
            // console.log(data)
            res.json(data);
        })
        .catch(err => {
            res.send(err);
        });
})
// Find the last workout (/api/workouts)
app.get('/api/workouts', (req, res) => {
    // need to find most recent
    db.Workout.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
})


// Post/put to existing workout with exercise method (/api/workouts/:id")
app.put('/api/workouts/:id', (req, res) => {
    console.log(req.body)
    // need to find by ID and push to array
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(err);
        });
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
