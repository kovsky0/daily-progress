const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/daily-progress',
    port: process.env.PORT || 1337,
    jwtKey: process.env.JWT_KEY || 'super-secret-key-muahahaha'
}
  
module.exports = config