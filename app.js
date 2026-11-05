// Demonstration records only. Replace these with licence-checked, attributed source data.
const records = [
  {plant:'Turmeric',latin:'Curcuma longa L.',topic:'Traditional use',type:'ethnobotanical',label:'Ethnobotanical report',use:'Community-reported use of rhizome preparations for general wellbeing; preparation and context vary by source.',source:'Kew — Useful Plants',sourceType:'Ethnobotanical database',year:'Accessed 2026',confidence:'Context varies',url:'https://www.kew.org/science/collections-and-resources/data-and-digital/useful-plants'},
  {plant:'Turmeric',latin:'Curcuma longa L.',topic:'Curcumin',type:'review',label:'Literature review',use:'Review discusses curcuminoids and anti-inflammatory mechanisms studied in preclinical and clinical literature.',source:'Hewlings & Kalman, Foods (2017)',sourceType:'Narrative review',year:'2017',confidence:'Review · mixed evidence',url:'https://doi.org/10.3390/foods6100092'},
  {plant:'Neem',latin:'Azadirachta indica A. Juss.',topic:'Traditional use',type:'ethnobotanical',label:'Ethnobotanical report',use:'Medicinal uses are documented across regions; reported plant parts and preparations are not interchangeable.',source:'Kew — Useful Plants',sourceType:'Ethnobotanical database',year:'Accessed 2026',confidence:'Context varies',url:'https://www.kew.org/science/collections-and-resources/data-and-digital/useful-plants'},
  {plant:'Neem',latin:'Azadirachta indica A. Juss.',topic:'Plant extracts',type:'in-vitro',label:'In vitro study',use:'Laboratory assays report biological activity for selected extracts; this does not establish effects in people.',source:'Subapriya & Nagini, Curr Med Chem',sourceType:'Review of experimental studies',year:'2005',confidence:'Preclinical only',url:'https://doi.org/10.2174/0929867053364786'},
  {plant:'Holy basil',latin:'Ocimum tenuiflorum L.',topic:'Traditional use',type:'ethnobotanical',label:'Ethnobotanical report',use:'Traditional applications are described in regional literature; cultural context and source attribution matter.',source:'Kew — Useful Plants',sourceType:'Ethnobotanical database',year:'Accessed 2026',confidence:'Context varies',url:'https://www.kew.org/science/collections-and-resources/data-and-digital/useful-plants'},
  {plant:'Holy basil',latin:'Ocimum tenuiflorum L.',topic:'Phytochemistry',type:'review',label:'Literature review',use:'Review surveys phytochemical constituents and reported pharmacological activity; methods and evidence quality vary.',source:'Cohen, J Ayurveda Integr Med (2014)',sourceType:'Narrative review',year:'2014',confidence:'Review · not a clinical guide',url:'https://doi.org/10.4103/0975-9476.146554'},
  {plant:'Ginger',latin:'Zingiber officinale Roscoe',topic:'Traditional use',type:'ethnobotanical',label:'Ethnobotanical report',use:'Uses for rhizome preparations are recorded in traditional and ethnobotanical sources; records do not establish efficacy.',source:'Kew — Useful Plants',sourceType:'Ethnobotanical database',year:'Accessed 2026',confidence:'Context varies',url:'https://www.kew.org/science/collections-and-resources/data-and-digital/useful-plants'},
  {plant:'Ginger',latin:'Zingiber officinale Roscoe',topic:'Gingerols',type:'review',label:'Literature review',use:'Review examines ginger constituents and potential mechanisms, noting limits in translating findings across study types.',source:'Mao et al., Foods (2019)',sourceType:'Literature review',year:'2019',confidence:'Review · evidence varies',url:'https://doi.org/10.3390/foods8110571'}
];

const recordRoot = document.querySelector('#records');
const search = document.querySelector('#search');
const plantFilter = document.querySelector('#plant-filter');
const evidenceFilter = document.querySelector('#evidence-filter');
const evidenceNames = {ethnobotanical:'Ethnobotanical report',review:'Literature review','in-vitro':'In vitro study'};

for (const plant of [...new Set(records.map(r => r.plant))]) {
  const option = document.createElement('option'); option.value = plant; option.textContent = plant; plantFilter.append(option);
}

function render() {
  const query = search.value.trim().toLowerCase();
  const matches = records.filter(r => {
    const haystack = [r.plant, r.latin, r.topic, r.use, r.source, r.sourceType].join(' ').toLowerCase();
    return (!query || haystack.includes(query)) && (plantFilter.value === 'all' || r.plant === plantFilter.value) && (evidenceFilter.value === 'all' || r.type === evidenceFilter.value);
  });
  document.querySelector('#result-count').textContent = matches.length;
  document.querySelector('#empty-state').hidden = matches.length !== 0;
  recordRoot.innerHTML = matches.map(r => `
    <article class="record-card">
      <div class="card-top"><span class="plant-tag">${r.plant} · ${r.topic}</span><span class="evidence-tag">${r.label}</span></div>
      <h3>${r.plant}</h3><div class="latin">${r.latin}</div>
      <p class="use-line">${r.use}</p>
      <div class="record-bottom"><div class="source-name"><b>${r.source}</b> · ${r.year}</div><span class="confidence"><i></i>${r.confidence}</span></div>
      <a class="record-link" href="${r.url}" target="_blank" rel="noopener noreferrer">Open source <span>↗</span></a>
    </article>`).join('');
}

search.addEventListener('input', render);
plantFilter.addEventListener('change', render);
evidenceFilter.addEventListener('change', render);
document.querySelector('#clear-filters').addEventListener('click', () => { search.value = ''; plantFilter.value = 'all'; evidenceFilter.value = 'all'; render(); search.focus(); });
document.querySelector('#dismiss-notice').addEventListener('click', () => document.querySelector('.notice').remove());
document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.focus(); } });
render();
