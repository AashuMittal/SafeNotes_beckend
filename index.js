const express = require('express');
const multer = require("multer");
const path = require('path');
const UserController = require('./controllers/UserController');
const sequalizeDb = require('./sequalizeDb');
const fs = require('fs');

const app = express();


app.use(express.json());

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    }
});


const upload = multer({ storage }).single('file');

// app.listen(9000, () => {
//     console.log("Server is running on port 9000");
// });


app.get('/', (req, res) => {
    res.send("App is working");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.urlencoded({ extended: false }));


app.post('/login', UserController.Login);
app.post('/register', UserController.Register);
app.get('/Add', UserController.Adds);
app.post('/Addchat',upload, UserController.createNote); 
app.put('/update/:userid', UserController.UpdateNote);
app.delete('/delete/:userid', UserController.deleteNote);





module.exports = app;