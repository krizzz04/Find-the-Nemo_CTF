const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://shebinn10:Krizzz%40123@cluster0.xvxphyq.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Example flags for demonstration purposes
const flags = {
  1: 'ls',
  2: '{p4ssw0rd4Lvltw0}',
  3: '{W3lc0me2lvl3}',
  4: '{w3lld0N3_my_d34r}',
  5: '{welcome_to_level5_achiever}',
  6: 'yougotitbrother',
  7: 'youarenowanameature',
  8: '{go_4_lvl_8_hacker!}',
  9: '{you_R_n4@r_the_n3m0_}',
  10: 'flag{king_0f_th3_hill}'
};

app.use(express.static(path.join(__dirname, 'public')))



const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Register route
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) {
      res.status(401).send('Invalid username or password');
    } else {
      res.send('Login successful');
    }
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/challenge', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'challenges.html'));
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });

  app.get('/level4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ctf.html'));
  });

  app.get('/commands', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'commands.html'));
  });

app.get('/checkFlag', (req, res) => {
    const { level, flag } = req.query;
    if (flags[level] === flag) {
      res.json({ correct: true });
    } else {
      res.json({ correct: false });
    }
  });



  
app.listen(5000, () => console.log('Server running on port 3000'));
