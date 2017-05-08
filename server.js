const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  })

  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to the home page'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  })
})

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})
