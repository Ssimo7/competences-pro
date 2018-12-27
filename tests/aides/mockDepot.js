export class MockDepot {
  constructor () {
    this.initialise();
  }

  initialise () {
    this.enregistrements = [];
  }

  enregistre (object) {
    this.enregistrements.push(object);
  }

  evenements () {
    return this.enregistrements;
  }
}
