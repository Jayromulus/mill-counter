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

const reset = document.getElementById('reset');

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

const logs = document.getElementById('logs');
const passTurn = document.getElementById('pass-turn');

const historyWindow = document.getElementById('game-history');
const historyDump = document.getElementById('dump');
const closeLogs = document.getElementById('close-history');

let deckSize = 53;
let discardSize = 0;
let runningTotal = [];
let gameLogs = [];
// let gameLogs = ['Jace, Perfected Mind milled the opponent 15 cards', 'Opponent milled 1 card', '--------------------------------------------------------', 'Passed Turn', '--------------------------------------------------------', 'Opponent drew 1 card from their deck', 'Exhibition Tidecaller milled the opponent 3 cards', 'Exhibition Tidecaller milled the opponent 3 cards', 'Stream of Thought milled the opponent 4 cards', 'Jace, Perfected Mind milled the opponent 15 cards', 'Opponent milled 1 card', 'Passed Turn', 'Opponent drew 1 card from their deck', 'Exhibition Tidecaller milled the opponent 3 cards', 'Exhibition Tidecaller milled the opponent 3 cards', 'Stream of Thought milled the opponent 4 cards', 'Jace, Perfected Mind milled the opponent 15 cards', 'Opponent milled 1 card', 'Passed Turn', 'Opponent drew 1 card from their deck', 'Exhibition Tidecaller milled the opponent 3 cards', 'Exhibition Tidecaller milled the opponent 3 cards', 'Stream of Thought milled the opponent 4 cards', 'Jace, Perfected Mind milled the opponent 15 cards', 'Opponent milled 1 card', 'Passed Turn', 'Opponent drew 1 card from their deck', 'Exhibition Tidecaller milled the opponent 3 cards', 'Exhibition Tidecaller milled the opponent 3 cards', 'Stream of Thought milled the opponent 4 cards', 'Jace, Perfected Mind milled the opponent 15 cards', 'Opponent milled 1 card', 'Passed Turn', 'Opponent drew 1 card from their deck', 'Exhibition Tidecaller milled the opponent 3 cards', 'Exhibition Tidecaller milled the opponent 3 cards', 'Stream of Thought milled the opponent 4 cards'];
let currentCustom = '';
let currentModifier = 'subtract';

function renderPage() {
  deck.innerText = deckSize;
  discard.innerText = discardSize;
  current.innerText = runningTotal.join('');
  modifier.innerText = currentModifier === 'add' ? '+' : '-';
}

renderLogs();

function renderLogs() {
  historyDump.innerHTML = '';
  gameLogs.forEach(log => {
    console.log(`rendering: ${log}`);
    const text = document.createElement('p');
    text.innerText = log;
    if (log === 'Passed Turn') text.style.textAlign = 'center';
    historyDump.appendChild(text);
  });
}

function resetGame() {
  deckSize = 53;
  discardSize = 0;
  currentCustom = '';
  currentModifier = 'subtract';
  while (runningTotal.length > 0) runningTotal.pop();
  while (gameLogs.length > 0) gameLogs.pop();

  renderPage();
}

function mill(amount, source) {
  deckSize -= amount;
  discardSize += amount;

  if (source && amount) gameLogs.push(`${source} milled the opponent ${amount} cards.`)

  renderPage();
}

function togglePopup(open, char) {
  open ? customPopup.classList.remove('hidden') : customPopup.classList.add('hidden');
  currentCustom = char;

  if (!open) currentModifier = 'subtract';
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
  let millAmount = parseInt(runningTotal.join(''));

  if (runningTotal.length > 0) mill(millAmount, false);
  switch (currentCustom) {
    case 'Jace, Perfected Mind':
      if (millAmount) gameLogs.push(`${currentCustom} milled the opponent ${millAmount} cards.`);
      break;
    case 'Surgical Extraction':
      if (millAmount) gameLogs.push(`${currentCustom} removed ${millAmount} cards from the opponent's deck.`);
      break;
    default:
      if (millAmount) gameLogs.push(`Opponent milled ${millAmount} cards.`);
      break;
  }

  togglePopup(false);
  while (runningTotal.length > 0) runningTotal.pop();

  renderPage();
}

function deckManip(amount, deck, discard, source) {
  if (source === 'pass') {
    deck = false;
    discard = false;

    deckSize -= 1;

    gameLogs.push('--------------------------------------------------------');
    gameLogs.push('Passed Turn');
    gameLogs.push('--------------------------------------------------------');

  }

  if (deck) {
    deckSize -= amount;
    if (amount) gameLogs.push(`Opponent ${amount > 0 ? 'drew' : 'returned'} ${Math.abs(amount)} ${amount > 1 || amount < -1 ? 'cards' : 'card'} ${amount > 0 ? 'from' : 'to'} their deck.`);
  }
  
  if (discard) {
    discardSize += amount;
    if (amount) gameLogs.push(`Opponent ${amount > 0 ? 'discarded' : 'removed'} ${Math.abs(amount)} ${amount > 1 || amount < -1 ? 'cards' : 'card'} ${amount > 0 ? 'from' : 'to'} their ${amount > 0 ? 'hand' : 'discard'}.`);
  }

  renderPage();
}

function toggleLogs(open) {
  if (open) {
    renderLogs();
    historyWindow.classList.remove('hidden');
  } else {
    historyWindow.classList.add('hidden');
  }
}

custom.addEventListener('click', e => togglePopup(true, 'custom'));
jace.addEventListener('click', e => togglePopup(true, 'Jace, Perfected Mind'));
surgical.addEventListener('click', e => togglePopup(true, 'Surgical Extraction'));

// update draw, discard, and cards on top to be a popup with an input
draw.addEventListener('click', e => deckManip(1, true, false, 'draw'));
discardCard.addEventListener('click', e => deckManip(1, false, true, 'discard'));
cardOnTop.addEventListener('click', e => deckManip(-1, true, false, 'top'));
passTurn.addEventListener('click', e => deckManip(1, true, false, 'pass'));

thought.addEventListener('click', e => mill(2, 'Thought Collapse'));
tidecaller.addEventListener('click', e => mill(3, 'Exhibition Tidecaller'));
secrets.addEventListener('click', e => mill(2, 'Drowned Secrets'));
archive.addEventListener('click', e => mill(13, 'Archive Trap'));
squall.addEventListener('click', e => mill(9, 'Sorcerous Squall'));
stream.addEventListener('click', e => mill(4, 'Stream of Thought'));
crab.addEventListener('click', e => mill(3, 'Ruin Crab'));

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

reset.addEventListener('click', e => resetGame());
submit.addEventListener('click', e => submitCustom());

logs.addEventListener('click', e => toggleLogs(true));
closeLogs.addEventListener('click', e => toggleLogs(false));