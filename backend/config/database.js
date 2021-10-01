import mongoose from 'mongoose'

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`Connected with MongoDB : ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error : ${error.message}`)
    process.exit(1)
  }
}

export default connectToDB
