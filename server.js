const express = require("express")
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/bucketListItem.routes')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
  .connect(mongoUri , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB database Connected...'))
  .catch((err) => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
