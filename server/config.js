const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/daily-progress',
    port: process.env.PORT || 1337
}
  
module.exports = config