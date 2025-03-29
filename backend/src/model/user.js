const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // "_id": new mongoose.Types.ObjectId().toHexString(),
    "username": {type: String, required: true, unique: true },
    "email": {type: String, required: true, unique: true },
    "password": {type: String, required: true }, // This should be hashed
    "created_at": {type: Date, default: Date.now},
    "updated_at": {type: Date, default: Date.now}
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
