import chai, { expect } from 'chai';
import { fournitMagasin } from '../src/app/fournitMagasin.js';
import jsdom from 'mocha-jsdom';

describe('fourni magasin', function() {

  jsdom({
    url: 'http://localhost/'
  });

  it('devrait ajouter les contenants sur les étagères', function() {

    const propertion = 2;

    document.body.innerHTML = '<div><img id="etageres"/></div>'
    document.getElementById('etageres').width = 1400/propertion;
    document.getElementById('etageres').height = 1000/propertion;
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
        100/propertion, 40/propertion,
        (100 + 200)/propertion, (40 + 300)/propertion
      ].join(','));

  });
});
