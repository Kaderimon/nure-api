import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const EventSchema = new Schema({
    id: Number,
    events:[]
});

export default mangoose.model('EventModel', EventSchema);
/*{
        subject: {},
        start_time: Number,
        end_time: Number,
        type: {},
        number_pair: Number,
        auditory: String,
        teachers:[],
        groups:[]
    }*/