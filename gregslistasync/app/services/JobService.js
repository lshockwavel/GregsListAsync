import { AppState } from "../AppState.js";
import { Job } from "../models/Job.js";
import { api } from "./AxiosService.js";

class JobService {

    async createJob(jobData) {
        // const job = new Job(jobData);
        const job = await api.post('api/jobs', jobData);
        console.log('Created job:', job.data);

        const newJob = new Job(job.data);
        // AppState.jobs.push(newJob); // Add to the front of the array
        AppState.jobs.unshift(newJob); // Add to the front of the array
        // this.saveJobs(); // Save to local storage
    }

    async getJobs() {
        const response = await api.get('api/jobs');
        console.log('Jobs from API:', response.data);

        // Map the response data to Job instances and update AppState
        AppState.jobs = response.data.map(j => new Job(j));
        console.log(AppState.jobs);
    }

    async editJob(jobData, jobId) {
        const response = await api.put(`api/jobs/${jobId}`, jobData);
        console.log('Edited job:', response.data);

        // Find the index of the job in AppState
        const index = AppState.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
            // Update the job in AppState
            AppState.jobs[index] = new Job(response.data);
            AppState.activeJob = null; // Clear the active job after editing

            AppState.emit('jobs'); // Emit an event to notify listeners
        } else {
            console.error('Job not found in AppState:', jobId);
        }
    }

    setActiveJob(jobId) {
        const job = AppState.jobs.find(j => j.id === jobId);
        if (!job) {
            console.error('Job not found:', jobId);
            return;
        }
        AppState.activeJob = job; // Set the active job in AppState
        console.log('Active job set to:', job);
    }

    // saveJobs() {
    //     const jobs = AppState.jobs;
    //     const jobsString = JSON.stringify(jobs);
    //     localStorage.setItem('gregslist_jobs', jobsString);
    // }

    // loadJobs() {
    //     const jobsString = localStorage.getItem('gregslist_jobs');
    //     // If there is no data in local storage, then don't do anything
    //     if (jobsString) {
    //         const jobs = JSON.parse(jobsString);
    //         AppState.jobs = jobs.map(j => new Job(j)); /* REVIEW Is it like creating new Job and overwriting it? Wondering if += could work in a similar format */
    //     }
    // }

    async deleteJob(id) {
        const response = await api.delete(`api/jobs/${id}`);
        console.log('Deleted job:', response.data);

        // Remove the job from AppState
        AppState.jobs = AppState.jobs.filter(j => j.id !== id);
        // this.saveJobs(); // Save to local storage
    }

}

export const jobService = new JobService();