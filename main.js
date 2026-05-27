const custom = document.getElementById('custom');
const jace = document.getElementById('jace-perfected-mind');
const thought = document.getElementById('thought-scour');
const tidecaller = document.getElementById('exhibition-tidecaller');
const secrets = document.getElementById('drowned-secrets');
const archive = document.getElementById('archive-trap');
const squall = document.getElementById('sorcerous-squall');
const stream = document.getElementById('stream-of-thought');
const surgical = document.getElementById('surgical-extraction');
const crab = document.getElementById('ruin-crab');

const deck = document.getElementById('deck-count');
const discard = document.getElementById('discard-count');

const reset = document.getElementById('reset-game');

const pageElements = [custom, jace, thought, tidecaller, secrets, archive, squall, stream, surgical, crab];

let deckSize = 53;
let discardSize = 0;

function renderPage() {
  deck.innerText = deckSize;
  discard.innerText = discardSize;
}

function mill(amount) {
  deckSize -= amount;
  discardSize += amount;

  renderPage();
}

function resetGame() {
  deckSize = 53;
  discardSize = 0;

  renderPage();
}

custom.addEventListener('click', e => mill(-2));
jace.addEventListener('click', e => mill(-3));
thought.addEventListener('click', e => mill(2));
tidecaller.addEventListener('click', e => mill(3));
secrets.addEventListener('click', e => mill(2));
archive.addEventListener('click', e => mill(13));
squall.addEventListener('click', e => mill(9));
stream.addEventListener('click', e => mill(4));
surgical.addEventListener('click', e => mill(-1));
crab.addEventListener('click', e => mill(3));

pageElements.forEach(el => el.classList.add('blurred'));
reset.addEventListener('click', e => resetGame());