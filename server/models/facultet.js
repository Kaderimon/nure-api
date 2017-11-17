import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const Facultet = new Schema({
    id: Number,
    short_name: String,
    full_name: String,
    directions: [{
        id: Number,
        short_name: String,
        full_name: String
    }],
    departments: [{
        id: Number,
        short_name: String,
        full_name: String
    }]
});

export default mangoose.model('Facultet', Facultet);