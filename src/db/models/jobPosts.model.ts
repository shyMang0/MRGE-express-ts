import { DataTypes, Model } from 'sequelize'
import sequelize from '@/db/config/sequelize'

interface JobPostsAttributes {
	id: string
	created_by: string
	title: string
	description: string
	validated_at?: Date
}

export interface JobPostsInput {
	id: string
	created_by?: string
	title?: string
	description?: string
	validated_at?: Date
}

export interface JobPostsOuput extends Required<JobPostsAttributes> {}

class JobPosts extends Model<JobPostsAttributes, JobPostsInput> implements JobPostsAttributes {
	public id!: string
	public created_by!: string
	public title!: string
	public description!: string
	public validated_at?: Date
	public readonly created_at?: Date
}

JobPosts.init(
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
		validated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'JobPosts',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
)

// Sync the model with the database (creates the table if it doesn't exist)
JobPosts.sync({ force: false })
	.then(() => {
		console.log('User table created (if not exists)')
	})
	.catch((err) => {
		console.error('Error creating User table:', err)
	})

export default JobPosts
