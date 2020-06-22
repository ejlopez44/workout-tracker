// define workout model
// fields: id, day, exercises(array)

const mongoose = require("mongoose");
const Int32 = require("mongoose-int32");
// const Exercise = require("./exercise");

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

    // type: [
    //     {
    //         type: String,
    //         name: String,
    //         duration: Int32Array,
    //         weight: Int32Array,
    //         reps: Int32Array,
    //         sets: Int32Array
    //     }
    // ],
    // default: undefined
});

workoutSchema.methods.addExercise = function (exercise) {
    // console for debugging
    console.log(exercise)
    // take the object passed and push it to the array of exercises
    // this.exercises.push(exercise)
    return this.exercises;
};

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
