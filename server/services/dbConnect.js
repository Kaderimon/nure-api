import mangoose from 'mongoose';
import config from '../config/config';
mangoose.connect(`${config.dbAddress}:${config.dbPort}`, {useMongoClient: true});
mangoose.Promise = global.Promise;

export const db = mangoose.connection;
export default mangoose;
db.on('error', function() {
  console.log('connection error');
});
db.once('open', function() {
  console.log('Connected to DB');
});