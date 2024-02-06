import { DataTypes, Model } from 'sequelize'
import sequelize from '@/db/config/sequelize'

interface SpamPostsAttributes {
	id: string
	created_by: string
	title: string
	description: string
	declined_at?: Date
}

export interface SpamPostsInput {
	id: string
	created_by?: string
	title?: string
	description?: string
	declined_at?: Date
}

export interface SpamPostsOuput extends Required<SpamPostsAttributes> {}

class SpamPosts extends Model<SpamPostsAttributes, SpamPostsInput> implements SpamPostsAttributes {
	public id!: string
	public created_by!: string
	public title!: string
	public description!: string
	public declined_at?: Date
	public readonly created_at?: Date
}

SpamPosts.init(
	{
		id: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true
		},
		created_by: {
			type: DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		declined_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'SpamPosts',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
)

// Sync the model with the database (creates the table if it doesn't exist)
SpamPosts.sync({ force: false })
	.then(() => {
		console.log('SpamPosts created (if not exists)')
	})
	.catch((err) => {
		console.error('Error creating User table:', err)
	})

export default SpamPosts
