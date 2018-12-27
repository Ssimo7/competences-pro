export class Observable {
  constructor () {
    this.observateurs = [];
  }

  ajouteObservateur (cb) {
    this.observateurs.push(cb);
  }

  notifieObservateurs () {
    this.observateurs.forEach(observateur => observateur());
  }
}
