const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useMongoClient: true
})