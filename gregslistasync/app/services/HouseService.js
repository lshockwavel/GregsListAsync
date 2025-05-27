import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";


class HouseService {
  /* 👷 */
  async createHouse(houseData) {
    const house = await api.post('api/houses', houseData);
    console.log('Created house:', house.data);

    const newHouse = new House(house.data);
    AppState.houses.unshift(newHouse); //Add to the front of the array
  }

  async getHouses() {
    const response = await api.get('api/houses');
    console.log('Houses from API:', response.data);
    const houses = response.data.map(h => new House(h));
    AppState.houses = houses; // Update the AppState with the fetched houses
    console.log(houses);
  }

  async editHouse(houseData, houseId) {
    const response = await api.put(`api/houses/${houseId}`, houseData);
    console.log('Edited house:', response.data);

    // Find the index of the house in AppState
    const index = AppState.houses.findIndex(h => h.id === houseId);
    if (index !== -1) {
      // Update the house in AppState
      AppState.houses[index] = new House(response.data);

      AppState.activeHouse = null; // Clear the active house after editing

      AppState.emit('houses'); // Emit an event to notify listeners
    } else {
      console.error('House not found in AppState:', houseId);
    }
  }

  setActiveHouse(houseId) {
    const house = AppState.houses.find(h => h.id === houseId);
    if (!house) {
      console.error('House not found:', houseId);
      return;
    }
    AppState.activeHouse = house; // Set the active house in AppState
    console.log('Active house set to:', house);
  }

  // /* 💾 */
  // saveHouse() {
  //   const house = AppState.houses;
  //   const houseString = JSON.stringify(house);
  //   localStorage.setItem('gregslist_houses', houseString);
  // }

  /* 💽 */
  // loadHouses() {
  //   const houseString = localStorage.getItem('gregslist_houses');
  //   // If there is no data in local storage, then don't do anything
  //   if (houseString) {
  //     const houses = JSON.parse(houseString);
  //     AppState.houses = houses.map(h => new House(h)); /* REVIEW Is it like creating new House and overwriting it? Wondering if += could work in a similar format */
  //   }
  // }

  /* 🚮 */
  async deleteHouse(id) {
    const response = await api.delete(`api/houses/${id}`);
    console.log('Deleted house:', response.data);
    // Remove the house from AppState
    const houseToDelete = AppState.houses.find(h => h.id === id);
    if (!houseToDelete) {
      console.error('House not found:', id);
      return;
    }
    // Remove the house from the AppState
    console.log('Removing house:', houseToDelete);

    const index = AppState.houses.indexOf(houseToDelete);
    if (index > -1) {
      AppState.houses.splice(index, 1); // Remove the house from the array
    }

    // AppState.houses = AppState.houses.filter(h => h.id !== id);
    // this.saveHouse(); // Save to local storage
  }
}

export const houseService = new HouseService();