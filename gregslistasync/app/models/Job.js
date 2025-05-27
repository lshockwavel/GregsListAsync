import { generateId } from "../utils/GenerateId.js"

export class Job {
    /**
     * @param {{
     * id: string,
     * title: string,
     * imgIconUrl: string,
     * company: string,
     * rate: number,
     * description: string,
     * hours: number,
     * location: string,
     * }} data
     */
    constructor(data) {
        this.id = generateId();
        this.title = data.title;
        this.imgIconUrl = data.imgIconUrl || 'https://images.unsplash.com/photo-1652512455891-11933272bc1f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        this.company = data.company;
        this.rate = data.rate;
        this.description = data.description;
        this.hours = data.hours;
        this.location = data.location;
    }

    get JobCard() {
        return /*html*/ `
        <div class="col-4">
            <div class="card mb-3">
                <div class="card-header text-center">
                    <h5>${this.company}</h5>
                    <img src="${this.imgIconUrl}" class="job-icon img-fluid rounded" alt="${this.company}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${this.title} at ${this.company}</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="card-text"><small class="text-muted">Rate: $${this.rate.toLocaleString()}</small></p>
                    <p class="card-text"><small class="text-muted">Hours: ${this.hours}</small></p>
                    <p class="card-text"><small class="text-muted">Location: ${this.location}</small></p>
                    <button class="btn btn-danger" onclick="app.JobController.deleteJob('${this.id}')">Delete</button>
                    <button class="btn btn-primary" onclick="app.JobController.editJob('${this.id}')">Edit(WIP)</button>
                </div>
            </div>
        </div>
        `
    }

}