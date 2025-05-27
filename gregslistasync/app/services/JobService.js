import { AppState } from "../AppState.js";
import { Job } from "../models/Job.js";
//REVIEW when I select AppState from the tab, it brings up "../models/Job" without the "".js" as a suggestion. Did I do I throw something off?

class JobService {

    createJob(jobData) {
        const job = new Job(jobData);
        AppState.jobs.unshift(job); // Add to the front of the array
        this.saveJobs(); // Save to local storage
    }

    saveJobs() {
        const jobs = AppState.jobs;
        const jobsString = JSON.stringify(jobs);
        localStorage.setItem('gregslist_jobs', jobsString);
    }

    loadJobs() {
        const jobsString = localStorage.getItem('gregslist_jobs');
        // If there is no data in local storage, then don't do anything
        if (jobsString) {
            const jobs = JSON.parse(jobsString);
            AppState.jobs = jobs.map(j => new Job(j)); /* REVIEW Is it like creating new Job and overwriting it? Wondering if += could work in a similar format */
        }
    }

    deleteJob(id) {
        AppState.jobs = AppState.jobs.filter(j => j.id !== id);
        this.saveJobs(); // Save to local storage
    }

}

export const jobService = new JobService();