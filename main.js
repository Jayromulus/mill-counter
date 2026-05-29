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
const draw = document.getElementById('draw');
const discardCard = document.getElementById('discard-card');
const cardOnTop = document.getElementById('card-on-top');

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
let runningTotal = [];
let currentModifier = 'subtract';

function renderPage() {
  deck.innerText = deckSize;
  discard.innerText = discardSize;
  current.innerText = runningTotal.join('');
  modifier.innerText = currentModifier === 'add' ? '+' : '-';
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

function addNumber(num) {
  runningTotal.push(num);
  
  renderPage();
}

function removeNumber() {
  runningTotal.pop();

  renderPage();
}

function toggleModifier() {
  currentModifier = currentModifier === 'subtract' ? 'add' : 'subtract'

  renderPage();
}

function submitCustom() {
  if (runningTotal.length > 0) mill(parseInt(runningTotal.join('')));
  togglePopup(false);
  while (runningTotal.length > 0) runningTotal.pop();
  renderPage();
}

function deckManip(amount, deck, discard) {
  if (deck) deckSize -= amount;
  if (discard) discardSize += amount;

  renderPage();
}

custom.addEventListener('click', e => togglePopup(true));
jace.addEventListener('click', e => togglePopup(true));
surgical.addEventListener('click', e => togglePopup(true));

draw.addEventListener('click', e => deckManip(1, true, false))
discardCard.addEventListener('click', e => deckManip(1, false, true))
cardOnTop.addEventListener('click', e => deckManip(-1, true, false))

thought.addEventListener('click', e => mill(2));
tidecaller.addEventListener('click', e => mill(3));
secrets.addEventListener('click', e => mill(2));
archive.addEventListener('click', e => mill(13));
squall.addEventListener('click', e => mill(9));
stream.addEventListener('click', e => mill(4));
crab.addEventListener('click', e => mill(3));


one.addEventListener('click', e => addNumber(1));
two.addEventListener('click', e => addNumber(2));
three.addEventListener('click', e => addNumber(3));
four.addEventListener('click', e => addNumber(4));
five.addEventListener('click', e => addNumber(5));
six.addEventListener('click', e => addNumber(6));
seven.addEventListener('click', e => addNumber(7));
eight.addEventListener('click', e => addNumber(8));
nine.addEventListener('click', e => addNumber(9));
zero.addEventListener('click', e => addNumber(0));

modifier.addEventListener('click', e => toggleModifier());
backspace.addEventListener('click', e => removeNumber());

pageElements.forEach(el => el.classList.add('blurred'));
reset.addEventListener('click', e => resetGame());
submit.addEventListener('click', e => submitCustom());