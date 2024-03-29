const mongoose = require('mongoose')
const seedUsers = require('./users.seed')
const seedCategories = require('./categories.seed')
const seedLicences = require('./licences.seed')

const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },
  async (err, res)=>{
    if(!err){
      console.log('**** DB connected ****'.bgGreen + '\n')
      if(process.argv[2] === '-i'){
        await seedUsers.importData()
        await seedCategories.importData()
        await seedLicences.importData()

        process.exit(0)
      } else if(process.argv[2] === '-d'){
        await seedUsers.deleteData()
        await seedCategories.deleteData()
        await seedLicences.deleteData()

        process.exit(0)
      }
    } else{
      console.log(err)
      console.log('**** DB connection error ****'.bgRed)
    }
})