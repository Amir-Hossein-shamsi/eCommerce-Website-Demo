import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB connected : ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error is : ${error.message}`)
    process.exit(1)
  }
}
export default connectDB
