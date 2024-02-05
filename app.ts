import express, { Express } from 'express'
import dotenv from 'dotenv'
import http from 'http'
import indexRoute from '@/api/routes/index.route'
import { engine } from 'express-handlebars'

const app: Express = express()

app.use(express.urlencoded({ extended: false }))

dotenv.config()

// testConnection()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use(indexRoute)

startServer()

// async function testConnection() {
// 	try {
// 		await dbInstance.testConnection()
// 	} catch (error) {
// 		console.error('Error connecting to SQLite database:', error)
// 	}
// }

async function startServer() {
	try {
		const httpServer = http.createServer(app)
		httpServer.listen(process.env.PORT || 3000)
		console.log('Http port :', process.env.PORT || 3000)
	} catch (err) {
		console.error(err)
	}
}
