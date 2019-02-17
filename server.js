const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next)=> {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=> {
    if (err) {
      console.log('Error');
    }
  });
  next();
});

/*app.use((req, res, next)=> {
  res.render('maintenance.hbs', {
    pageTitle: 'maintenance',
  })
})*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
})

app.get('/', (req, res)=> {
  //res.send('<h1>Hello express!</h1>');
  res.send  ({
    name: 'Gaurav',
    likes: [
      'Biking',
      'Coding'
    ],
  })
});

app.get('/home', (req, res)=> {
  res.render('home.hbs', {
    message: 'Welcome to the home page',
    pageTitle: 'This is our home page',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/more', (req, res) => {
  res.send({
    age: '19',
    gender: 'male',
  })
});

app.get('/projects', (req, res)=> {
  res.render('projects.hbs', {
    pageTitle: 'Project Page',
  });
});

app.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
