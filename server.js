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

// ------------ CREATE USERS ---------------
// create model from schema
const User = mongoose.model('User', userSchema)

// ------------ USER KENNY
// new instancy of model User
const kenny = new User ({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
})
kenny.manify(function(err, name) {
    if (err) throw err
    console.log('Twoje nowe imię to: '+name)
})
// saving to the database
kenny.save(function(err){
    if (err) throw err
    console.log('Uzytkownik ' + kenny.name + ' zapisany pomyslnie')
})
// ------------ USER BENNY
const benny = new User ({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
})
benny.manify(function(err, name) {
    if (err) throw err
    console.log('Twoje nowe imię to: '+name)
})
benny.save(function(err){
    if (err) throw err
    console.log('Uzytkownik ' + benny.name + ' zapisany pomyslnie')
})
// ------------ USER MARK
const mark = new User ({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
})
mark.manify(function(err, name) {
    if (err) throw err
    console.log('Twoje nowe imię to: '+name)
})
mark.save(function(err){
    if (err) throw err
    console.log('Uzytkownik ' + mark.name + ' zapisany pomyslnie')
})