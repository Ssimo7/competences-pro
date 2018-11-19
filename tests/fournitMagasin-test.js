import chai, { expect } from 'chai';
import { fournitMagasin, ouvreContenant } from '../src/app/fournitMagasin.js';
import jsdom from 'mocha-jsdom';

describe('fourni magasin', function() {

  jsdom({
    url: 'http://localhost/'
  });

  it('devrait ajouter les contenants sur les étagères', function() {

    const proportion = 2;

    document.body.innerHTML = '<div><img id="etageres"/></div>'
    document.getElementById('etageres').width = 1400/proportion;
    document.getElementById('etageres').height = 1000/proportion;
    let stock = {
      "width" : 1400,
      "height" : 1000,
      "contenants": [
        {
          "type": "Vrac SKY",
          "mesure" : "volume",
          "quantite": 25,
          "posX": 100,
          "posY": 40,
          "width": 200,
          "height": 300
        }
      ]
    };
    fournitMagasin('etageres', stock);

    const map = document.getElementById('etageresMap');
    expect(map).to.not.be.null;
    expect(map.name).to.equal('etageresMap');
    expect(document.getElementById('etageres').getAttribute('usemap')).to.equal('#etageresMap');

    expect(map.firstChild.nodeName).to.equal('AREA');
    expect(map.firstChild.shape).to.equal('rect');
    expect(map.firstChild.coords).to.equal(
      [
        100/proportion, 40/proportion,
        (100 + 200)/proportion, (40 + 300)/proportion
      ].join(','));
  });

  it("devrait afficher le contenu d'un contenant", function() {

    document.body.innerHTML = `<div id="contenant" class="cache">
        <label class="type" id="type"></label>
          <label id="quantite"></label>
          <label id="unite"></label>
      </div>`

    ouvreContenant({
      "type": "Vrac SKY",
      "mesure" : "volume",
      "quantite": 25
    });

    expect(document.getElementById('contenant').classList.value).to.eql('montre');
    expect(document.getElementById('type').textContent).to.eql('Vrac SKY');
    expect(document.getElementById('quantite').textContent).to.eql('25');
    expect(document.getElementById('unite').textContent).to.eql('litres');
  });

});
