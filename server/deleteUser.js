require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    console.log('Connected to MongoDB');
    await User.deleteMany({ email: 'csvijay48@gmail.com' });
    console.log('Deleted user');
    mongoose.disconnect();
}).catch(console.error);
