const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useMongoClient: true
})

// new user schema
const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    admin: Boolean,
    created_at: Date,
    updated_at: Date
})

// mongoose schema method
userSchema.methods.manify = function(next){
    this.name = this.name + '-boy';
    return next(null, this.name);
}

// pre-save method
userSchema.pre('save', function(next){
    const currentDate = new Date(); // take current time
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
})