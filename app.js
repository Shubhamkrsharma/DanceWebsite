const express = require("express");
const path = require("path");
const app= express();
const fs= require("fs");
const mongoose = require('mongoose');
const bodyparser= require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}
const port= 8000;

//define moongose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
 });
const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug');
})


app.post(`/contact`, (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
})


// app.post('/contact', (req, res)=>{
//     yourname = req.body.yourname
//     phone = req.body.phone
//     email = req.body.email
//     address = req.body.address
//     desc = req.body.desc

//     let outputToWrite = `the name of the person is: ${yourname}, phone number is: ${phone} , email id is: ${email}, residing at: ${address}. More about him/her: ${desc}`
//     fs.writeFileSync('output.txt', outputToWrite)
//     const params = {'message': 'Your form has been submitted successfully'}
//     res.status(200).render('contact.pug', params);
// })

 //START THE SERVER
 app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});