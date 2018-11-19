function fournitMagasin (etageresId, stock) {
  let etageres = document.getElementById(etageresId);
  let etageresMap = document.createElement('map');
  etageresMap.id = etageresId + 'Map';
  etageresMap.name = etageresMap.id;
  etageres.parentElement.appendChild(etageresMap);
  etageres.setAttribute('usemap', "#" + etageresMap.name);

  stock.contenants.forEach(function(contenant) {
    const left = contenant.posX / stock.width * etageres.width;
    const top = contenant.posY / stock.height * etageres.height;
    const width = contenant.width / stock.width * etageres.width;
    const height = contenant.height / stock.height * etageres.height;

    //   <area shape="rect" coords="34,44,270,350" href="…">
    let area = document.createElement("area");
    area.shape = 'rect'
    area.coords= [left, top, left+width, top+height].join(',')
    area.addEventListener('click', function () {
      ouvreContenant(contenant);
    });
    etageresMap.appendChild(area);
  });
}

function ouvreContenant (contenant) {
  document.getElementById('contenant').classList.replace('cache', 'montre');
  document.getElementById('type').textContent = contenant.type;
  document.getElementById('quantite').textContent = contenant.quantite;
  document.getElementById('unite').textContent = contenant.mesure === 'volume' ? 'litres' : 'bouteilles'
};

export {
  fournitMagasin,
  ouvreContenant
}
