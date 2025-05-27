import { generateId } from "../utils/GenerateId.js"

export class House {
    /**
     * @param {{
     * id: string,
     * bedrooms: number,
     * bathrooms: number,
     * year: number,
     * price: number,
     * imgUrl: string,
     * description: string,
     * levels: number,
     * createdAt: Date,
     * updatedAt: Date,
     * creator: string
     * }} data
     */
    constructor(data) {
        this.id = data.id;
        this.bedrooms = data.bedrooms || 0;
        this.bathrooms = data.bathrooms || 0;
        this.year = data.year;
        this.levels = data.levels || 1; // Default to 1 level if not provided
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
        this.creator = data.creator || 'Unknown';
        this.price = data.price;
        this.imgUrl = data.imgUrl || 'https://images.unsplash.com/photo-1652512455891-11933272bc1f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        this.description = data.description;
        // this.sqft = data.sqft;
        // this.address = data.address;
    }

    get HouseCard() {
        return /*html*/ `
        <div class="col-4">
            <div class="card mb-3">
                <img src="${this.imgUrl}" class="house-card rounded-top" alt="${this.description}">
                <div class="card-body">
                    <h5 class="card-title">${this.bedrooms} bed, ${this.bathrooms} bath</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="card-text"><small class="text-muted">Year: ${this.year}</small></p>
                    <p class="card-text"><small class="text-muted">Price: $${this.price.toLocaleString()}</small></p>
                    <p class="card-text"><small class="text-muted">Created On: ${this.createdAt.toLocaleDateString()}</small></p>
                    <p class="card-text"><small class="text-muted">Update On: ${this.updatedAt.toLocaleDateString()}</small></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="card-text"><small class="text-muted">Levels: ${this.levels}</small></p>
                        <p class="card-text"><small class="text-muted">Creator: ${this.creator.name}</small></p>
                    </div>
                    <button class="btn btn-danger" onclick="app.HouseController.deleteHouse('${this.id}')">Delete</button>
                    <button class="btn btn-primary" onclick="app.HouseController.editHouse('${this.House}')">Edit</button>
                </div>
            </div>
        </div>
        `
    }

    static HouseCreateCard() {
        return /*html*/ `
        <form onsubmit="app.HouseController.createHouse(event)">
          <div class="col-12 bg-white rounded p-3 mb-3">
            <div class="row">
              <div class="col-md-4 mb-2">
                <label for="house-bedrooms">Bedroom</label>
                <input minlength="0" maxlength="99" type="number" name="bedrooms" id="house-bedrooms" placeholder="Bedrooms" class="form-control">
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-bathrooms">Bathroom</label>
                <input minlength="0" maxlength="99" type="number" step=".5" name="bathrooms" id="house-bathrooms" placeholder="Bathrooms" class="form-control">
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-Price">Price</label>
                <input min="1" max="999999999" type="number" name="price" id="house-price" placeholder="Price" class="form-control" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-year">Year</label>
                <input type="number" min="1886" max="2025" name="year" id="house-year" placeholder="Year" class="form-control" value="2025" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-levels">Levels</label>
                <input type="number" min="1" name="levels" id="house-levels" step="1" placeholder="Levels" class="form-control" required>
              </div>
              <!-- <div class="col-md-4 mb-2">
                <label for="house-sqft">Square Feet</label>
                <input type="text" name="sqft" id="house-sqft" step="100" placeholder="Square Feet" class="form-control" required>
              </div> -->
              <!-- <div class="col-md-4 mb-2">
                <label for="house-address">Address</label>
                <input type="text" name="address" id="house-address" placeholder="Address" class="form-control" required>
              </div> -->
              <div class="col-md-12 mb-2">
                <label for="house-imgUrl">URL for picture</label>
                <input type="text" name="imgUrl" id="house-imgUrl" placeholder="Image URL" class="form-control" >
              </div>
              <div class="col-12 mb-2">
                <label for="house-description">Description</label>
                <textarea name="description" id="house-description" placeholder="Description" class="form-control" rows="4"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mb-3 shadow rounded-pill">
                Create House
              </button>
            </div>
          </div>
        </form>
        `
    }

    static HouseEditCard() {
        return /*html*/ `
        <form onsubmit="app.HouseController.editHouse(event, '${this.id}')">
          <div class="col-12 bg-white rounded p-3 mb-3">
            <div class="row">
              <div class="col-md-4 mb-2">
                <label for="house-bedrooms">Bedroom</label>
                <input minlength="0" maxlength="99" type="number" name="bedrooms" id="house-bedrooms" placeholder="Bedrooms" class="form-control" value="${this.bedrooms}">
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-bathrooms">Bathroom</label>
                <input minlength="0" maxlength="99" type="number" step=".5" name="bathrooms" id="house-bathrooms" placeholder="Bathrooms" class="form-control" value="${this.bathrooms}">
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-Price">Price</label>
                <input min="1" max="999999999" type="number" name="price" id="house-price" placeholder="Price" class="form-control" value="${this.price}" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-year">Year</label>
                <input type="number" min="1886" max="2025" name="year" id="house-year" placeholder="Year" class="form-control" value="${this.year}" required>
              </div>
              <div class="col-md-4 mb-2">
                <label for="house-levels">Levels</label>
                <input type="number" min="1" name="levels" id="house-levels" step="1" placeholder="Levels" class="form-control" value="${this.levels}" required>
              </div>
              <!-- <div class="col-md-4 mb-2">
                <label for="house-sqft">Square Feet</label>
                <input type="text" name="sqft" id="house-sqft" step="100" placeholder="Square Feet" class="form-control" required>
              </div> -->
              <!-- <div class="col-md-4 mb-2">
                <label for="house-address">Address</label>
                <input type="text" name="address" id="house-address" placeholder="Address" class="form-control" required>
              </div> -->
              <div class="col-md-12 mb-2">
                <label for="house-imgUrl">URL for picture</label>
                <input type="text" name="imgUrl" id="house-imgUrl" placeholder="Image URL" class="form-control" value="${this.imgUrl}">
              </div>
              <div class="col-12 mb-2">
                <label for="house-description">Description</label>
                <textarea name="description" id="house-description" placeholder="Description" class="form-control" rows="4">${this.description}</textarea>
              </div>
              <button type="submit" class="btn btn-primary mb-3 shadow rounded-pill">
                Edit House
              </button>
            </div>
          </div>
        </form>
        `;
    }

}