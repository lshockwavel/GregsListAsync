import { AuthController } from './controllers/AuthController.js';
import { router } from './router-config.js';
import { HouseController } from "./controllers/HouseController.js";
import { JobController } from "./controllers/JobController.js";
const USE_ROUTER = false

class App {

  AuthController = new AuthController()

  HouseController = new HouseController();
  JobController = new JobController();
  
  constructor() {
    if(USE_ROUTER){
      this.router = router
      this.router.init(this)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
