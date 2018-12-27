import { Observable } from '../../src/modeles/observable.js';

describe('Observateur', function () {
  it('notifie ses observateurs', function () {
    let observable = new Observable();
    let observateursPrevenus = [false, false];
    const observateur1 = () => { observateursPrevenus[0] = true; };
    const observateur2 = () => { observateursPrevenus[1] = true; };
    observable.ajouteObservateur(observateur1);
    observable.ajouteObservateur(observateur2);

    observable.notifieObservateurs();

    expect(observateursPrevenus).to.eql([true, true]);
  });
});
