// define workout model
// fields: id, day, exercises(array)

const mongoose = require("mongoose");
const Int32 = require("mongoose-int32");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
    },
    name: {
        type: String,
    },
    duration: {
        type: Int32,
    },
    weight: {
        type: Int32,
    },
    reps: {
        type: Int32,
    },
    sets: {
        type: Int32,
    },
    distance: {
        type: Int32,
    }
})


const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [exerciseSchema]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
