import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const EventSchema = new Schema({
    id: Number,
    events:[{
        subject: Object,
        start_time: Date,
        end_time: Date,
        type: { type: Object },
        number_pair: Number,
        auditory: String,
        teachers: Array,
        groups: Array
    }],
    sync: String,
    target: String
});

export default mangoose.model('EventModel', EventSchema);