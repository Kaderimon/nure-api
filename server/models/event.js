import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const EventSchema = new Schema({
    id: Number,
    events:[{
        subject_id: Number,
        start_time: Number,
        end_time: Number,
        type: Number,
        number_pair: Number,
        auditory: String,
        teachers:[],
        groups:[]
    }]
});

export default mangoose.model('Event', EventSchema);