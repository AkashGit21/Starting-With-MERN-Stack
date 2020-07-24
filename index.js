const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const config = require('./config/key');
const { User } = require('./model/user');

mongoose.connect(config.mongoURI,
        {useNewUrlParser:true, useUnifiedTopology:true}).then(()=> console.log('DB connected!'))
        .catch(err => console.error(err));

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req,res)=> {

    const user = new User(req.body);
    user.save((err,userData) => {
        if(err) return res.json({sucess:false, err});
        return res.status(200).json({
            sucess:true,
            userData: doc
        });
    });
})

app.listen(5000);