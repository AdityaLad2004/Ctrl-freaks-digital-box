const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 6000;

mongoose.connect('mongodb+srv://atharvmandpe2:Athu234@cluster0.enfsd50.mongodb.net/complaintsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());







// Use the new route for handling chat messages
const messageRoutes = require('../app/api/message/route');
app.use('/api/messages', messageRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});