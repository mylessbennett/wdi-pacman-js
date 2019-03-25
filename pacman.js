// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;


// Define your ghosts here
  const inky = {
    menuOption: '1',
    name: 'Inky',
    colour: 'Red',
    character: 'Shadow',
    edible: false
  };

  const blinky = {
    menuOption: '2',
    name: 'Blinky',
    colour: 'Cyan',
    character: 'Speedy',
    edible: false
  };

  const pinky = {
    menuOption: '3',
    name: 'Pinky',
    colour: 'Pink',
    character: 'Bashful',
    edible: false
  };

  const clyde = {
    menuOption: '4',
    name: 'Clyde',
    colour: 'Orange',
    character: 'Pokey',
    edible: false
  };

const ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
  console.log(`\n\nPower-Pellets: ${powerPellets}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  for (let i = 0; i < ghosts.length; i++) {
    ghostName = ghosts[i].name;
    ghostNum = ghosts[i].menuOption;
    console.log(`(${ghostNum}) Eat ${ghostName}`);
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function gameOver() {
  if (lives <= 0) {
    process.exit();
  }
}

function eatGhost(ghost) {
  if (ghost.edible == false) {
    lives -= 1;
    gameOver();
    console.log(`\n${ghost.name}, the ${ghost.colour} ghost killed Pac-Man!`);
  }
}

function eatPowerPellet() {
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
  score +=  50;
  powerPellets -= 1
  console.log('\nChomp!')
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      } else {
        console.log('\nNo Power-Pellets left!');
      }
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
