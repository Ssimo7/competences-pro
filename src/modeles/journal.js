import { Observable } from './observable.js';

export class Journal extends Observable {
  constructor (maintenant, depot) {
    super();
    this.maintenant = maintenant;
    this.depot = depot;
  }

  enregistreOuvertureContenant (contenant) {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        type: 'ouvertureContenant',
        description: contenant
      }
    );
    this.notifieObservateurs();
  }

  initialise () {
    this.depot.initialise();
  }

  evenements () {
    return this.depot.evenements();
  }
}
