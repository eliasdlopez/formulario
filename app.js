const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/usuarios', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', function(error) {
  console.error('ERROR', error);
});


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

// registered userSchema

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


//// MODEL
const User = mongoose.model('User', UserSchema);

//// CREATE TABLE 
app.get("/", async (req, res) => {
  const users = await User.find();
  res.render("table", { users: users })
});

// GET Register - Muestra el formulario

app.get('/register', (req, res) => {
  res.render('form');
});

// POST /REGISTER - CREA EL USUARIO

app.post ('/register', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password
  console.log(req.body);
  const user = new User ({name, email, password})
  
  await user.save();
  res.redirect('/')
});

app.listen('3000', () => console.log('visitantes Recursivo Puerto 3000'));
