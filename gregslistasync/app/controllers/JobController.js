import { AppState } from "../AppState.js";
import { jobService } from "../services/JobService.js";



export class JobController {
    constructor() {
        console.log('JobController loaded');
        this.drawJobs();
        AppState.on('jobs', this.drawJobs);
        jobService.loadJobs();
    }

    /* 📝 */
    drawJobs() {
        console.log('Drawing jobs');
        let template = '';

        AppState.jobs.forEach(j => template += j.JobCard);

        document.getElementById('job-listings').innerHTML = template;
    }

    /* 👷 */
    createJob(event) {
        console.log('Creating job');
        event.preventDefault();
        const form = event.target;
        console.log(form);
        console.log(form.imgIconUrl.value);

        // const jobData = getFormData(form);
        const jobData = {
            title: form.title.value,
            company: form.company.value,
            rate: form.rate.value,
            description: form.description.value,
            hours: form.hours.value,
            location: form.location.value,
            imgIconUrl: form.imgIconUrl.value
        };
        console.log('job data', jobData);
        jobService.createJob(jobData);
        // this.drawJobs();

        // Reset the form after submission
        form.reset();
    }

    /* 🚮 */
    deleteJob(id) {
        console.log('Deleting job', id);
        const confirmDelete = confirm('Are you sure you want to delete this job?');
        if (confirmDelete) {
            // If the user confirms, delete the job
            jobService.deleteJob(id);
        }
    }
}