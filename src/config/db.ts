import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined')
    }
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}