import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { listen } from 'decentraland-gatsby/dist/entities/Server/utils'
import { status, logger } from 'decentraland-gatsby/dist/entities/Route/routes'
import database from './entities/Database/index'
import events from './entities/Event/routes'
import attendees from './entities/EventAttendee/routes'
import profiles from './entities/Profile/routes'
import social from './entities/Social/routes'

const app = express()

app.use(social)

app.use('/api', [
  status(),
  logger(),
  bodyParser.json(),
  events,
  attendees,
  profiles
])

app.use(express.static('public'))

Promise.resolve()
  .then(() => database.connect())
  .then(() => listen(
    app,
    process.env.PORT,
    process.env.HOST
  ))
