const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Jobs = require('../models/Job');
const {jobValidation, jobUpdateValidation} = require('./validation');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
   const allJobs =  await Jobs.find({})
   res.status(200).send({jobs: allJobs})
})


router.post('/', auth, async (req, res) => {
    const {id, full_name} = req.user;
    const 
    { job_title, job_description, job_category, company_name, company_email, website_url, application_link } = req.body;

    const { error, value } = jobValidation(req.body);
    if(error) return res.status(422).send({message: error.details[0].message});

    const newJob = Jobs({
        job_title, 
        job_description, 
        job_category, 
        contact_personId: id,
        job_poster: full_name,
        company_name, 
        company_email, 
        website_url, 
        application_link
    })
    try {
        const job = await newJob.save();
        res.status(200).send({ jobCreated: job })
    } catch(err) {
        res.status(400).send({ message: err})
    }
})

router.patch('/:id', (req, res) => {
    // get the id 
    const jobId = req.params.id;

    // validate the fields if correct
    const { error} = jobUpdateValidation(req.body);
    if(error) return res.status(422).send({message: error.details[0].message});
    
    // spread the fields
    let updatedJob = {...req.body};

    Jobs.findByIdAndUpdate(jobId, updatedJob, {new: true}, (err, value) => {
        if(err) return res.status(401).send({message: 'User not found', err})
        res.status(200).send({message: 'updated job', value })
    })

})

router.delete('/:id', auth, async(req, res) => {
    const jobId = req.params.id;
    try {
        const jobDeleted = await Jobs.findByIdAndDelete(jobId);
        res.status(200).send({ message: 'Job deleted', jobDeleted })
    } catch(err) {
        res.status(400).send({ message: err})
    }

    
})


module.exports = router;