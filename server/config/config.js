const config = {
  port: process.env.port || 3001,
  dbAddress: process.env.MONGODB_URI || `mongodb://localhost:${27017}`,
  apiSource: 'http://cist.nure.ua/ias/app/tt'
}
export default config;