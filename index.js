let gameState = 'start'; 
let paddle_1 = document.querySelector('.paddle_1'); 
let paddle_2 = document.querySelector('.paddle_2'); 
let board = document.querySelector('.board'); 
let initial_ball = document.querySelector('.ball'); 
let ball = document.querySelector('.ball'); 
let score_1 = document.querySelector('.player_1_score'); 
let score_2 = document.querySelector('.player_2_score'); 
let message = document.querySelector('.message'); 
let paddle_1_coord = paddle_1.getBoundingClientRect(); 
let paddle_2_coord = paddle_2.getBoundingClientRect(); 
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord; 
let board_coord = board.getBoundingClientRect(); 
let paddle_common = document.querySelector('.paddle').getBoundingClientRect(); 
let dx = Math.floor(Math.random() * 4) + 3; 
let dy = Math.floor(Math.random() * 4) + 3; 
let dxd = Math.floor(Math.random() * 2); 
let dyd = Math.floor(Math.random() * 2); 

document.addEventListener('keydown', (e) => { 
if (e.key == 'Enter') { 
	gameState = gameState == 'start' ? 'play' : 'start'; 
	if (gameState == 'play') { 
	message.innerHTML = 'Game Started'; 
	message.style.left = 42 + 'vw'; 
	requestAnimationFrame(() => { 
		dx = Math.floor(Math.random() * 4) + 3; 
		dy = Math.floor(Math.random() * 4) + 3; 
		dxd = Math.floor(Math.random() * 2); 
		dyd = Math.floor(Math.random() * 2); 
		moveBall(dx, dy, dxd, dyd); 
		document.getElementById('startGameSound').play();
	}); 		
	} 
} 
if (gameState == 'play') { 
	if (e.key == 's') { 
	paddle_1.style.top = 
		Math.max( 
		board_coord.top, 
		paddle_1_coord.top - window.innerHeight * 0.06 
		) + 'px'; 
	paddle_1_coord = paddle_1.getBoundingClientRect(); 
	} 
	if (e.key == 'w') { 
	paddle_1.style.top = 
		Math.min( 
		board_coord.bottom - paddle_common.height, 
		paddle_1_coord.top + window.innerHeight * 0.06 
		) + 'px'; 
	paddle_1_coord = paddle_1.getBoundingClientRect(); 
	} 
} 
}); 
const MAX_SCORE = 5; 

function checkEndGame() {
    if (parseInt(score_1.innerHTML) >= MAX_SCORE || parseInt(score_2.innerHTML) >= MAX_SCORE) {
        endGame();
    }
}

function endGame() {
    gameState = 'end';
    alert("Game Over");
	document.getElementById('startGameSound').pause();
    document.getElementById('startGameSound').currentTime = 0;
	paddle_1.style.visibility = 'hidden'; 
    paddle_2.style.visibility = 'hidden';
    ball.style.visibility = 'hidden';
    score_1.style.visibility = 'hidden';
    score_2.style.visibility = 'hidden';
    message.style.visibility = 'hidden';
    board.style.visibility = 'hidden';
    chanceCount.style.visibility = 'hidden';
	ball.style.display = 'none';
	
	
}

window.alert = function (message, timeout = null) {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert-container');

    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');

    const alertText = document.createElement('p');
    alertText.innerText = message;

    const alertButton = document.createElement('button');
    alertButton.innerText = 'OK';

    alertButton.addEventListener('click', () => {
        alertContainer.remove();
		window.location.href = "rat.html";
    });

    alertBox.appendChild(alertText);
    alertBox.appendChild(alertButton);
    alertContainer.appendChild(alertBox);

    document.body.appendChild(alertContainer);
	score_2.innerHTML = 0;
	score_1.innerHTML = 0;
    document.getElementById('gameOverSound').play();


    if (timeout != null) {
        setTimeout(() => {
            alertContainer.remove();
			
        }, Number(timeout))
    }

}









function moveBall(dx, dy, dxd, dyd) { 
	let computerPaddleSpeed = 4; 
// kn7ddo biha lharaka dyal computer's badle
	if (ball_coord.top + ball_coord.height / 2 	< paddle_2_coord.top + paddle_2_coord.height / 2) {
        paddle_2.style.top = (paddle_2_coord.top - computerPaddleSpeed) + 'px';
    } else {
        paddle_2.style.top = (paddle_2_coord.top + computerPaddleSpeed) + 'px';
    }
    paddle_2_coord = paddle_2.getBoundingClientRect();
	

// hna knchufu chkun rbeh wknzido lih fscore ta3u
    if (ball_coord.left <= board_coord.left || ball_coord.right >= board_coord.right) {
        if (ball_coord.left <= board_coord.left) {
            score_2.innerHTML = +score_2.innerHTML + 1;
        } else {
            score_1.innerHTML = +score_1.innerHTML + 1;
        }
        checkEndGame();
        gameState = 'start';
        ball_coord = initial_ball_coord;
        ball.style = initial_ball.style;
        message.innerHTML = 'Press Enter to Play Pong';
        message.style.left = 38 + 'vw';
        return;
    }
	// s9ef wlard
if (ball_coord.top <= board_coord.top) { 
	dyd = 1; 
} 
if (ball_coord.bottom >= board_coord.bottom) { 
	dyd = 0; 
} 
// hna knth99o mn anaho lkora çaset bga3 les coins lmadrib lplayers bjouj
if ( 
	ball_coord.left <= paddle_1_coord.right && 
	ball_coord.top >= paddle_1_coord.top && 
	ball_coord.bottom <= paddle_1_coord.bottom 
) { 
	// liser
	dxd = 1; 
	dx = Math.floor(Math.random() * 8) + 5; 
	dy = Math.floor(Math.random() * 8) + 5; 
	playPaddleHitSound();
} 
if ( 
	ball_coord.right >= paddle_2_coord.left && 
	ball_coord.top >= paddle_2_coord.top && 
	ball_coord.bottom <= paddle_2_coord.bottom 
) { 
	// limen 
	dxd = 0; 
	dx = Math.floor(Math.random() * 8) + 5; 
	dy = Math.floor(Math.random() * 8) + 5; 
	playPaddleHitSound();
} 
// hna 3awtani th99na mn chkon  rbeh bch nzidohfscore
if ( 
	ball_coord.left <= board_coord.left || 
	ball_coord.right >= board_coord.right 
) { 
	if (ball_coord.left <= board_coord.left) { 
	score_2.innerHTML = +score_2.innerHTML + 1; 
	} else { 
	score_1.innerHTML = +score_1.innerHTML + 1; 
	} 
	gameState = 'start'; 

	ball_coord = initial_ball_coord; 
	ball.style = initial_ball.style; 
	message.innerHTML = 'Press Enter to Play Pong'; 
	message.style.left = 38 + 'vw'; 
	return; 
} 

ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px'; 
ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px'; 
paddle_1_coord = paddle_1.getBoundingClientRect();
paddle_2_coord = paddle_2.getBoundingClientRect();
ball_coord = ball.getBoundingClientRect(); 
requestAnimationFrame(() => { 
	moveBall(dx, dy, dxd, dyd); 
}); 
};
function playPaddleHitSound() {
    const paddleHitSound = document.getElementById('paddleHitSound');
    paddleHitSound.play();
}
