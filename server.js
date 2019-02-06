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
/*kenny.save(function(err){
    if (err) throw err
    console.log('Uzytkownik ' + kenny.name + ' zapisany pomyslnie')
})*/
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
/*benny.save(function(err){
    if (err) throw err
    console.log('Uzytkownik ' + benny.name + ' zapisany pomyslnie')
})*/
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
/*mark.save(function(err){
    if (err) throw err
    console.log('Uzytkownik ' + mark.name + ' zapisany pomyslnie')
})*/

const findAllUsers = function() {
    return User.find({}, function (err,res) {
        if (err) throw err;
        console.log('Actual database records are '+res)
    })
}

const findSpecificRecord = function() {
    return User.find({username: 'Kenny_the_boy'}, function (err,res) {
        if (err) throw err;
        console.log('Record you looking for is '+res)
    })
}

const updateUserPassword = function() {
    return User.findOne({username: 'Kenny_the_boy'})
    .then(function(user){
        console.log('Old password: '+user.password)
        console.log('Name: '+user.name)
        user.password = 'newPassword'
        console.log('New password: '+user.password)
        return user.save(function(err){
            if (err) throw err;
            console.log('Uzytkownik '+user.name+' zaktualizowany pomyslnie!')
        })
    })
}

const updateUsername = function() {
    return User.findOneAndUpdate(
        {username: 'Benny_the_boy'},
        {username: 'Benny_the_man'},
        {new: true},
        function(err, user){
            if(err) throw err;
            console.log('Nazwa uzytkownika po aktualizacji: '+user.username)
        }
    )
}

const findMarkAndDelete = function(){
    return User.findOne({username: 'Mark_the_boy'})
    .then(function(user) {
        return user.remove(function(){
            console.log('User Mark successfully deleted')
        })
    })
}

const findKennyAndDelete = function(){
    return User.findOne({username: 'Kenny_the_boy'})
    .then(function(user) {
        return user.remove(function(){
            console.log('User Kenny successfully deleted')
        })
    })
}

const findBennyAndDelete = function(){
    return User.findOne({username: 'Benny_the_man'})
    .then(function(user) {
        return user.remove(function(){
            console.log('User Benny successfully deleted')
        })
    })
}

Promise.all([kenny.save(), mark.save(), benny.save()])
    .then(findAllUsers)
    .then(findSpecificRecord)
    .then(updateUserPassword)
    .then(updateUsername)
    .then(findMarkAndDelete)
    .then(findKennyAndDelete)
    .then(findBennyAndDelete)
    .catch(console.log.bind(console))
