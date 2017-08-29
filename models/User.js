const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
// const { Schema } = mongoose; duplicate of line 2 code;


const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);