import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const Group = new Schema({
    id: Number,
    name: String,
    direction_id: Number
});

export default mangoose.model('Group', Group);