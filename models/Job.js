const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobSchema = new Schema({
    job_title: { type: String, required: true},
    job_description: { type: String, required: true},
    job_category: { type: String, required: true},
    website_url: { type: String, required: true},
    company_name: { type: String},
    company_email: { type: String},
    contact_personId: { type: Schema.Types.ObjectId, ref: 'User'},
    job_poster: { type: String, required: true},
    application_link: { type: String},
    date_posted: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Job', JobSchema);