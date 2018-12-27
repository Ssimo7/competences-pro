/* global Event */

import { DepotJournal } from '../../src/infra/depot_journal.js';
import jsdom from 'jsdom-global';

describe('le depot du journal', function () {
  let depot;

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
    depot = new DepotJournal();
  });

  it('initialise le depot', function () {
    depot.enregistre({ cle: 'valeur' });

    depot.initialise();

    expect(depot.evenements()).to.eql([]);
    const lignes = JSON.parse(window.localStorage.getItem('journal'));
    expect(lignes).to.be.empty();
  });

  it('enregistre les lignes du journal dans le localStorage', function () {
    depot.enregistre({ cle: 'valeur' });
    depot.enregistre({ autreCle: 'valeur2' });

    const lignes = JSON.parse(window.localStorage.getItem('journal'));
    expect(lignes.length).to.equal(2);
    expect(lignes).to.eql([
      { cle: 'valeur' },
      { autreCle: 'valeur2' }
    ]);
  });

  it("vérifie s'il n'existe pas un journal au démarrage et le charge", function () {
    depot.enregistre('typeEvenement', { cle: 'valeur' });

    depot = new DepotJournal();
    depot.enregistre('typeEvenement', { cle: 'valeur' });

    const lignes = JSON.parse(window.localStorage.getItem('journal'));
    expect(lignes.length).to.equal(2);
  });

  it('retourne les lignes du journal', function () {
    depot.enregistre({ cle: 'valeur' });
    depot.enregistre({ cle: 'valeur2' });

    expect(depot.evenements()).to.eql([
      { 'cle': 'valeur' },
      { 'cle': 'valeur2' }
    ]
    );
  });

  it('rafraichi les lignes si le localstorage a été mis à jour par un autre onglet', function () {
    depot.enregistre('typeEvenement', { cle: 'valeur' });

    window.localStorage.setItem('journal', JSON.stringify([]));
    window.dispatchEvent(new Event('storage'));

    expect(depot.lignes).to.eql([]);
  });

  it('notifie les observateurs si le localstorage a été mis à jour par un autre onglet', function () {
    let observateursPrevenus = [false, false];
    const observateur1 = () => { observateursPrevenus[0] = true; };
    const observateur2 = () => { observateursPrevenus[1] = true; };
    depot.ajouteObservateur(observateur1);
    depot.ajouteObservateur(observateur2);

    window.dispatchEvent(new Event('storage'));

    expect(observateursPrevenus).to.eql([true, true]);
  });
});
