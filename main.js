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

const customPopup = document.getElementById('custom-input');

const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const modifier = document.getElementById('modifier');
const zero = document.getElementById('zero');
const backspace = document.getElementById('backspace');
const current = document.getElementById('current');
const submit = document.getElementById('submit');

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

function togglePopup(open) {
  open ? customPopup.classList.remove('hidden') : customPopup.classList.add('hidden');
}

custom.addEventListener('click', e => togglePopup(true));
jace.addEventListener('click', e => togglePopup(true));
thought.addEventListener('click', e => mill(2));
tidecaller.addEventListener('click', e => mill(3));
secrets.addEventListener('click', e => mill(2));
archive.addEventListener('click', e => mill(13));
squall.addEventListener('click', e => mill(9));
stream.addEventListener('click', e => mill(4));
surgical.addEventListener('click', e => togglePopup(true));
crab.addEventListener('click', e => mill(3));

pageElements.forEach(el => el.classList.add('blurred'));
reset.addEventListener('click', e => resetGame());
submit.addEventListener('click', e => togglePopup(false));