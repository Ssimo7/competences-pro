import jsdom from 'jsdom-global';
import { Situation } from 'controle/modeles/situation.js';
import { VueSituation } from 'controle/vues/situation.js';

describe('La situation « Contrôle »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="situation-controle"></div>');
    $ = jQuery(window);
  });

  it.only('Affiche les pièces en séquence selon le scénario pré-établi', function (done) {
    const situation = new Situation({
      cadence: 10,
      scenario: [true, false, false],
      positionApparitionPieces: { x: 10, y: 20 }
    });

    const vueSituation = new VueSituation(situation);
    vueSituation.affiche('#situation-controle', $);
    setTimeout(function () {
      let nbPieces = $('.piece').length;
      expect(nbPieces).to.equal(3);
      done();
    }, 120);
  });
});
