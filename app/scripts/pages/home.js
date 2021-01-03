import { Jumbotron } from '../components/jumbotron'

class Home {

  constructor() {

    this.jumbotron = new Jumbotron()

  }

  init() {
    this.jumbotron.init()
  }

}

export { Home }
