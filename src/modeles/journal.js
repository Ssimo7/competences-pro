import { Observable } from './observable.js';

export class Journal extends Observable {
  constructor (maintenant, depot) {
    super();
    this.maintenant = maintenant;
    this.depot = depot;
    // this.depot.ajouteObservateur(() => {
    //  this.notifieObservateurs();
    // });
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
    // this.notifieObservateurs();
  }

  evenements () {
    return this.depot.evenements();
  }
}
