const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { readFile } = require('fs');
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./backend/middleware/auth.js");
const Post = require('./frontend/views/postModel.js'); // Ensure this path is correct

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'backend')));
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'frontend/views'));

// Route to fetch and display posts on the homepage
app.get('/homePage.html', async (request, response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    response.render('homePage', { posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    response.status(500).send('Sorry, something went wrong!');
  }
});

// Route to handle post submissions
app.post('/submit-post', async (request, response) => {
  try {
    const newPost = new Post(request.body);
    await newPost.save();
    response.redirect('/homePage');
  } catch (err) {
    console.error('Error saving post:', err);
    response.status(500).send('Sorry, something went wrong!');
  }
});

// Other routes and middleware
app.get('/aboutPage.html', (request, response) => {
  readFile(path.join(__dirname, 'frontend', 'views', 'aboutPage.html'), 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading aboutPage.html:', err);
      response.status(500).send('Sorry, something went wrong!');
      return;
    }
    response.send(html);
  });
});

app.get('/createPost.html', (request, response) => {
  readFile(path.join(__dirname, 'frontend', 'views', 'createPost.html'), 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading createPost.html:', err);
      response.status(500).send('Sorry, something went wrong!');
      return;
    }
    response.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

const connectDB = require("./backend/config/database");
connectDB();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://studyhubsose:team25SOSE@studyhub.3lizww3.mongodb.net/?retryWrites=true&w=majority&appName=StudyHub', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
  

app.get('/homePage.html', async (request, response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    response.render('homePage', { posts }); // Assuming you're using EJS
  } catch (err) {
    console.error('Error fetching posts:', err);
    response.status(500).send('Sorry, something went wrong!');
  }
});

//route handles post submissions
app.post('/submit-post', async (request, response) => {
    try {
      const newPost = new Post(request.body); // Assuming body-parser middleware is used
      await newPost.save();
      response.redirect('/homePage.html');
    } catch (err) {
      console.error('Error saving post:', err);
      response.status(500).send('Sorry, something went wrong!');
    }
  });

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'frontend/views'));

// Your routes and other middleware
app.get('/homePage.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'homePage.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading homePage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});






/*
const server = app.listen(PORT, () =>
    console.log(`Server Connected to port ${PORT}`)
  )

  // Handling Error
  process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })
    */


mongoose.connect(mongoString);

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'backend')));
app.use("/api/auth", require("./backend/Auth/route"))
app.use(cookieParser());

//app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
//app.get("/basic", userAuth, (req, res) => res.send("User Route"));
//app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))

// clears the cookie
app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  })

  

/*
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
    */

const routes = require('./backend/routes/routes');

app.use('/api', routes)

// Serve static files from the 'frontend/views' directory
app.use(express.static(path.join(__dirname, 'frontend', 'views')));

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, 'frontend', 'public')));


// Loads the landing page at http://127.0.0.1:3000/
app.get('/', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'landingPage.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading landingPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});

// Loads the index.html page at http://127.0.0.1:3000/index.html
app.get('/index.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'index.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading landingPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});

// Loads the Rich Text Editor page at http://127.0.0.1:3000/rte.html
app.get('/rte.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'rte.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading landingPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});



app.get('/aboutPage.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'aboutPage.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading aboutPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});

app.get('/homePage', async (request, response) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      response.render('homePage', { posts }); // Assuming you're using EJS
    } catch (err) {
      console.error('Error fetching posts:', err);
      response.status(500).send('Sorry, something went wrong!');
    }
});

  app.get('/createPost.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'createPost.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading createPost.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});

// Example in server.js or backend/routes/routes.js
app.get('/', async (req, res) => {
    // Simulate fetching posts from a database
    const posts = await fetchPostsFromDatabase();
    res.render('frontend/views/homePage', { posts });
});

//search bar
app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const matchingPosts = posts.filter(post => post.title.toLowerCase().includes(query));
    res.json(matchingPosts);
});

console.log('App available on http://localhost:3000');


