import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db/notes.db'
})

export default sequelize
