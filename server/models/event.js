import mangoose from '../services/dbConnect';
const Schema = mangoose.Schema;

const EventSchema = new Schema({
    subject_id: Number,
    start_time:1504260600,
    end_time:1504266300,
    type:0,
    number_pair:4,
    auditory:"406и",
    teachers:[],
    groups:[4801962 ,4801938 ,6541634 ]
});

export default mangoose.model('Event', EventSchema);