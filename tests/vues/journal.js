/* global Event */

import { VueJournal } from '../../src/vues/journal.js';
import { Observable } from '../../src/modeles/observable.js';
import jsdom from 'jsdom-global';

describe('vue journal', function () {
  let vue;
  let journal;
  let pointInsertion;
  let evenementsJournal = [ 'ligne1', 'ligne2' ];
  let aEteInitialise = false;

  beforeEach(function () {
    jsdom('<div id="restitution"></div>');
    journal = new Observable();
    journal.evenements = () => {
      return evenementsJournal;
    };
    journal.initialise = () => {
      aEteInitialise = true;
    };
    pointInsertion = document.getElementById('restitution');
    vue = new VueJournal('#restitution', journal);
  });

  it('initialise une zone de texte', function () {
    const zoneJournal = pointInsertion.querySelector('#journal');
    expect(zoneJournal).to.not.be(null);
  });

  it('affiche le contenu du journal dans la zone de texte', function () {
    vue.affiche();

    expect(document.getElementById('journal').textContent).to.equal('"ligne1"\n"ligne2"');
  });

  it("s'enregistre pour afficher le contenu du journal à chaque mise à jour de celui-ci", function () {
    evenementsJournal.push('ligne3');
    journal.notifieObservateurs();

    expect(document.getElementById('journal').textContent).to.equal('"ligne1"\n"ligne2"\n"ligne3"');
  });

  it('affiche un bouton de remise à zero du journal', function () {
    const boutonReset = pointInsertion.querySelector('#resetjournal');
    expect(boutonReset).to.not.be(null);
    expect(boutonReset.textContent).to.equal('effacer le journal');
  });

  it('remet à zero le journal quand on clique sur le bouton', function () {
    const boutonReset = pointInsertion.querySelector('#resetjournal');
    boutonReset.dispatchEvent(new Event('click'));

    expect(aEteInitialise).to.be(true);
  });
});
