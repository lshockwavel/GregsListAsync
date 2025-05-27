import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";


class HouseService {
  /* 👷 */
  async createHouse(houseData) {
    const house = await api.post('api/houses', houseData);
    console.log('Created house:', house.data);

    const newHouse = new House(house.data);
    AppState.houses.push(newHouse); //Add to the front of the array
  }

  async getHouses() {
    const response = await api.get('api/houses');
    console.log('Houses from API:', response.data);
    const houses = response.data.map(h => new House(h));
    AppState.houses = houses; // Update the AppState with the fetched houses
    console.log(houses);
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
  deleteHouse(id) {
    AppState.houses = AppState.houses.filter(h => h.id !== id);
    this.saveHouse(); // Save to local storage
  }
}

export const houseService = new HouseService();