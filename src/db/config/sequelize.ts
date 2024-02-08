import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db/JobListing.db',
	logging: false
})

export default sequelize
