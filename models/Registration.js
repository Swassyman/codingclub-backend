import { Schema, model } from 'mongoose';

const registrationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Member', required: true},
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true}
});

export default model('Registration', registrationSchema);