import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const EventSchema = new Schema({
    id: Number,
    events:[{
        subject: {},
        start_time: Number,
        end_time: Number,
        type: Number,
        number_pair: Number,
        auditory: String,
        teachers:[],
        groups:[]
    }]
});

export default mangoose.model('EventModel', EventSchema);