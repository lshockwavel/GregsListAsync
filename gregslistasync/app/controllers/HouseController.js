import { AppState } from "../AppState.js";
import { houseService } from "../services/HouseService.js";
import { setHTML } from "../utils/Writer.js";
import { getFormData } from "../utils/FormHandler.js";
import { House } from "../models/House.js";
import { Pop } from "../utils/Pop.js";


export class HouseController {
    constructor() {
        console.log('HouseController loaded');
        // this.drawHouses();
        this.drawCreateHouseForm();
        this.getHouses();
        AppState.on('houses', this.drawHouses);
        AppState.on('user', this.showCreateHouseForm)
        AppState.on('activeHouse', this.drawActiveHouse);
        AppState.on('account', this.drawHouses);
        // houseService.loadHouses();
    }

    async getHouses() {
        await houseService.getHouses();
    }

    showCreateHouseForm() {
        const houseFormElm = document.getElementById('house-form');
        houseFormElm.classList.remove('d-none');
    }

    /* 📝 */
    drawHouses() {
        console.log('Drawing houses');
        let template = '';

        AppState.houses.forEach(h => template += h.HouseCard);

        setHTML('house-listings', template);

        // document.getElementById('house-listings').innerHTML = template;
    }

    drawCreateHouseForm() {
        console.log('Drawing create house form');
        setHTML('house-form', House.HouseCreateCard());
    }

    drawActiveHouse(house) {
        console.log('Drawing edit house form for', house);
        setHTML('house-form', House.HouseEditCard(house));
    }



    /* 👷 */
    async createHouse(event) {
        console.log('Creating house');
        try {
            event.preventDefault();
            const form = event.target;
            console.log(form);
            console.log(form.description.value);

            const houseData = getFormData(form);
            // const houseData = {
            //     bedrooms: form.bedrooms.value,
            //     bathrooms: form.bathrooms.value,
            //     year: form.year.value,
            //     price: form.price.value,
            //     imgUrl: form.imgUrl.value,
            //     description: form.description.value,
            //     sqft: form.sqft.value,
            //     address: form.address.value
            // };
            console.log('house data', houseData);
            await houseService.createHouse(houseData);
            // this.drawHouses();

            // Reset the form after submission
            form.reset();
        }
        catch (error) {
            console.error('Error creating house:', error);
            // Optionally, you can show an error message to the user
            alert('Failed to create house. Please try again.');
            console.error(error);
        }
    }

    drawActiveHouse() {
        console.log('Drawing active house');
        const activeHouse = AppState.activeHouse;
        if (!activeHouse) {
            setHTML('active-house', '<p>No active house selected.</p>');
            return;
        }
        setHTML('active-house', activeHouse.HouseCard);
    }


    /* 🚮 */
    async deleteHouse(id) {

        try {
            // Creating a user confirmation before deleting the house
            console.log('Deleting house', id);
            // const confirmDelete = confirm('Are you sure you want to delete this house?');
            const confirmDelete = await Pop.confirm('Are you sure you want to delete this house?');
            console.log('Confirm delete:', confirmDelete);
            if (confirmDelete) {
                await houseService.deleteHouse(id);
            }
        }
        catch (error) {
            console.error('Error deleting house:', error);
            // Optionally, you can show an error message to the user
            Pop.error('Failed to delete house. Please try again.');
        }
        
    }

    async editHouse(houseData) {
        console.log('Editing house', houseData);
        // Implement the logic to edit the house


    }
}