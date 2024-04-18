const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    score: {
        type: Number,
        default: null
    }
    
});

userSchema.pre("save", async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);