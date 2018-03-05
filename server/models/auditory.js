import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const Auditory = new Schema({
    id: Number,
    short_name: String,
    full_name: String,
    auditory_types: [],
    floor: String,
    is_have_power: String
});

export default mangoose.model('Auditory', Auditory);