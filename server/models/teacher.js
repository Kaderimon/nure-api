import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const Teacher = new Schema({
    id: Number,
    short_name: String,
    full_name: String,
    department_id: Number
});

export default mangoose.model('Teacher', Teacher);