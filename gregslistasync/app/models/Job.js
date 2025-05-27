import { generateId } from "../utils/GenerateId.js"

export class Job {
    /**
     * @param {{
     * id: string,
     * title: string,
     * company: string,
     * rate: number,
     * description: string,
     * hours: number,
     * location: string,
     * createdAt: Date,
     * updatedAt: Date,
     * creator: {
     *  name: string,
     *  id: string
     * }
     * }} data
     */
    constructor(data) {
        this.id =  data.id;
        this.jobTitle = data.jobTitle;
        // this.imgIconUrl = data.imgIconUrl || 'https://images.unsplash.com/photo-1652512455891-11933272bc1f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        this.company = data.company;
        this.rate = data.rate;
        this.description = data.description;
        this.hours = data.hours;
        this.location = data.location;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
        this.creator = data.creator || 'Unknown';
    }

    get JobCard() {
        return /*html*/ `
        <div class="col-4">
            <div class="card mb-3">
                <div class="card-header text-center">
                    <h5>${this.company}</h5>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${this.jobTitle} at ${this.company}</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="card-text"><small class="text-muted">Rate: $${this.rate.toLocaleString()}</small></p>
                    <p class="card-text"><small class="text-muted">Hours: ${this.hours}</small></p>
                    <p class="card-text"><small class="text-muted">Location: ${this.location}</small></p>
                    <p class="card-text"><small class="text-muted">Created On: ${this.createdAt.toLocaleDateString()}</small></p>
                    <p class="card-text"><small class="text-muted">Update On: ${this.updatedAt.toLocaleDateString()}</small></p>
                    <p class="card-text"><small class="text-muted">Creator: ${this.creator.name}</small></p>
                    <button class="btn btn-danger" onclick="app.JobController.deleteJob('${this.id}')">Delete</button>
                    <button class="btn btn-primary" onclick="app.JobController.setActiveJob('${this.id}')">Edit</button>
                </div>
            </div>
        </div>
        `
    }

    static JobCreateCard() {
        return /*html*/ `
        <form onsubmit="app.JobController.createJob(event)">
          <div class="col-12 bg-white rounded p-3 mb-3">
            <div class="row">
              <div class="col-md-4 mb-2">
                <label for="job-company">Company</label>
                <input type="text" name="company" id="job-company" placeholder="Company Name" class="form-control" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-jobTitle">Job Title</label>
                <input type="text" name="jobTitle" id="job-jobTitle" placeholder="Job Title" class="form-control" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-rate">Salary</label>
                <input type="number" name="rate" id="job-rate" placeholder="Salary (e.g., 50000)" class="form-control" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-hours">Hours/Week</label>
                <input type="number" name="hours" id="job-hours" placeholder="Hours per Week" class="form-control" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-location">Location</label>
                <input type="text" name="location" id="job-location" placeholder="Location" class="form-control" required>
              </div>
              <div class="col-12 mb-2">
                <label for="job-description">Description</label>
                <textarea name="description" id="job-description" placeholder="Job Description" class="form-control" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-success mb-3 shadow rounded-pill" style="background: linear-gradient(45deg, #198754, #20c997); border: none;">
                Create Job
              </button>
            </div>
          </div>
        </form>
        `
    }

    static JobEditCard(job) {
        return /*html*/ `
        <form onsubmit="app.JobController.editJob(event, '${job.id}')">
          <div class="col-12 bg-white rounded p-3 mb-3">
            <div class="row">
              <div class="col-md-4 mb-2">
                <label for="job-company">Company</label>
                <input type="text" name="company" id="job-company" value="${job.company}" class="form-control" required value="${job.company}">
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-title">Job Title</label>
                <input type="text" name="title" id="job-title" value="${job.title}" class="form-control" required value="${job.jobTitle}">
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-rate">Salary</label>
                <input type="number" name="rate" id="job-rate" value="${job.rate}" class="form-control" required value="${job.rate}">
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-hours">Hours/Week</label>
                <input type="number" name="hours" id="job-hours" value="${job.hours}" class="form-control" required value="${job.hours}">
              </div>
              <div class="col-md-4 mb-2">
                <label for="job-location">Location</label>
                <input type="text" name="location" id="job-location" value="${job.location}" class="form-control" required value="${job.location}">
              </div>
              <div class="col-12 mb-2">
                <label for="job-description">Description</label>
                <textarea name="description" id="job-description" class="form-control" rows="4">${job.description}</textarea>
              </div>
              <button type="submit" class="btn btn-success mb-3 shadow rounded-pill" style="background: linear-gradient(45deg, #198754, #20c997); border: none;">
                Create Job
              </button>
            </div>
          </div>
        </form>
        `
    }

}