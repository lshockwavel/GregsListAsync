import { House } from './models/House.js'
import { Job } from './models/Job.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /** @type {House[]} */
  houses = [];

  /** @type {House | null} */
  activeHouse = null;

  /** @type {Job[]} */
  jobs = [];

  /** @type {Job | null} */
  activeJob = null;

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null
}

export const AppState = createObservableProxy(new ObservableAppState())