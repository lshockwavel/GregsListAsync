import { AppState } from "../AppState.js";
import { jobService } from "../services/JobService.js";
import { Pop } from "../utils/Pop.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";
import { Job } from "../models/Job.js";


export class JobController {
    constructor() {
        console.log('JobController loaded');
        this.getJobs();
        // this.drawJobs();
        this.drawCreateJobForm();
        AppState.on('user', this.showCreateJobForm);
        AppState.on('jobs', this.drawJobs);
        AppState.on('account', this.drawJobs);
        AppState.on('activeJob', this.drawActiveJob);
        // jobService.loadJobs();
    }

    async getJobs() {
        await jobService.getJobs();
    }

    setActiveJob(jobId) {
        console.log('Setting active job', jobId);
        jobService.setActiveJob(jobId);
    }

    drawCreateJobForm() {
        console.log('Drawing create job form');
        setHTML('job-form', Job.JobCreateCard());
    }

    showCreateJobForm() {
        const jobFormElm = document.getElementById('job-form');
        jobFormElm.classList.remove('d-none');
    }


    /* 📝 */
    drawJobs() {
        console.log('Drawing jobs');
        let template = '';

        AppState.jobs.forEach(j => template += j.JobCard);

        setHTML('job-listings', template);

        // document.getElementById('job-listings').innerHTML = template;
    }

    drawActiveJob() {
        const job = AppState.activeJob;
        if (!job) {
            console.log('No active job to draw');
            setHTML('job-form', '<p>No active job selected.</p>');
            return;
        }
        console.log('Drawing active job', job);
        setHTML('job-form', Job.JobEditCard(job));
    }

    /* 👷 */
    async createJob(event) {
        console.log('Creating job');

        try {
            event.preventDefault();
            const form = event.target;
            console.log("form Data:", form);
            console.log("form Value:",form.description.value);
    
            const jobData = getFormData(form);
            // const jobData = {
            //     title: form.title.value,
            //     company: form.company.value,
            //     rate: form.rate.value,
            //     description: form.description.value,
            //     hours: form.hours.value,
            //     location: form.location.value,
            //     imgIconUrl: form.imgIconUrl.value
            // };
            console.log('job data', jobData);
            await jobService.createJob(jobData);
            // this.drawJobs();
    
            // Reset the form after submission
            form.reset();
        }
        catch (error) {
            console.error('Error creating job:', error);
            Pop.error(error.message || 'Failed to create job');
        }

    }


    async editJob(event, id) {
        console.log('Editing job', id);
        try {
            event.preventDefault();
            const form = event.target;
            const jobData = getFormData(form);
            console.log('job data', jobData);
    
            // Call the service to update the job
            await jobService.editJob(jobData, id);
    
            // Reset the form after submission
            form.reset();

            this.drawCreateJobForm();
        } catch (error) {
            console.error('Error editing job:', error);
            Pop.error(error.message || 'Failed to edit job');
        }
    }

    /* 🚮 */
    async deleteJob(id) {
        console.log('Deleting job', id);

        try {
            const confirmDelete = await Pop.confirm('Are you sure you want to delete this job?');
            console.log('Confirm delete:', confirmDelete);
            if (confirmDelete) {
                await jobService.deleteJob(id);
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            Pop.error(error.message || 'Failed to delete job');
        }
    }
}