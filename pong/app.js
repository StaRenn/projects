window.onload = function() {
    let left_player = document.querySelector("#left_player");
    let right_player = document.querySelector("#right_player");
    let ball = document.querySelector("#ball");
    let score = document.querySelector("#score");
    let game = document.querySelector(".main_game");
    let start = document.querySelector(".menu__start_button");
    let menu = document.querySelector(".menu");
    let inputs = document.getElementsByName("difficulty");
    let left_player_pos = 45;
    let right_player_pos = 45;
    let ball_pos_x= 50;
    let ball_pos_y = 50;
    let ball_speed_x = -0.2;
    let ball_speed_y = -0.2;
    let left_player_score = 0;
    let right_player_score = 0;
    let difficult = 0.1;
    let ball_width = 16/document.body.clientWidth*100;
    let ball_height = 16/document.body.clientHeight*100;

    ball.style.width = ball_width + "%";
    ball.style.height = ball_height + "%";
    left_player.style.top = left_player_pos + "%";
    right_player.style.top = right_player_pos + "%";
    
        function doesBallCollidesWithPlayer(player, player_position){
        if (Math.round(ball_pos_x) === player_position && (ball_pos_y + ball_height >= player && ball_pos_y <= player + 10)) { //colliding left bar
            ball_speed_x = -ball_speed_x; //changing ball's x direction
            ball_speed_y = ball_speed_y < 0 ? -Math.random()/3 : Math.random()/3 //changing ball's y direction
        }
    }

    function resetFieldAndReturnNewPlayerScore(player_score) {
        //resetting ball position with random height
        ball_pos_y = Math.random()*50;
        ball_pos_x = 50;
        ball_speed_x = -ball_speed_x;
        //resetting player positions
        left_player_pos = 45;
        right_player_pos = 45;
        left_player.style.top = "45%";
        right_player.style.top = "45%";
        randomizeBallSpeedAndDirection();
        return ++player_score
    }

    function ballMovement(){
        ball_pos_x += ball_speed_x;
        ball_pos_y += ball_speed_y;
        ball.style.left = ball_pos_x + "%";
        ball.style.top = ball_pos_y + "%";
    }

    function randomizeBallSpeedAndDirection() {
        Math.random() > .5 ? ball_speed_y = Math.random()/3 : ball_speed_y = -Math.random()/3;
    }

    function doesBallCollidesWithBorders() {
        if (ball_pos_y <= 0 || Math.ceil(ball_pos_y) >= 99) { //colliding top/bottom border
            ball_speed_y = -ball_speed_y
        }
    }

    function isMobile () {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    function updateScore() {
        score.innerHTML = `${left_player_score} ${right_player_score}`;
    }

    function playerMovementControls(clientYPosition) {
        left_player_pos = clientYPosition / document.body.clientHeight * 100 - 5;
        if (left_player_pos <= 0) {left_player_pos = 0;}        //limiting left player Y axis movement
        else if (left_player_pos >= 89) {left_player_pos = 89;} //limiting left player Y axis movement
        left_player.style.top = left_player_pos + '%';
    }

    //check difficulty and hide menu
    start.onclick = function(){
        for(let i = 0; i < inputs.length; i++){
            if (inputs[i].checked){
                difficult = 0.175 + i*0.05
            }
        }
        menu.style.display = "none"
    };


    ////////////////
    ///main  game///
    ////////////////

    game.onmouseenter = function() {
        game.onmouseenter = null;
        setInterval(pong, 3);

        function pong() {

            ballMovement();

            doesBallCollidesWithPlayer(left_player_pos, 3);
            doesBallCollidesWithPlayer(right_player_pos, 97);

            doesBallCollidesWithBorders();

            if (ball_pos_x <= 0) { //if right player scores
                right_player_score = resetFieldAndReturnNewPlayerScore(right_player_score);
                updateScore();
            } else if (Math.ceil(ball_pos_x) >= 100) { //if left player scores
                left_player_score = resetFieldAndReturnNewPlayerScore(left_player_score);
                updateScore();
            }

            //right player "ai"
            if (right_player_pos <= 0) {right_player_pos = 0}        //limiting right player Y axis movement
            else if (right_player_pos >= 89) {right_player_pos = 89} //limiting right player Y axis movement

            //with this code right player simply follows the ball with speed that depends on chosen difficulty
            //if the ball higher than right player, then right player will go up
            //else down
            if (right_player_pos + 5 > ball_pos_y) {right_player_pos -= difficult;}
            else {right_player_pos += difficult;}
            right_player.style.top = right_player_pos + "%";

            //controls
            if (isMobile()) { //detecting touch device
                window.ontouchmove = function (event) {
                    playerMovementControls(event.touches[0].clientY)
                }
            } else {
                window.onmousemove = function (event) {
                    playerMovementControls(event.clientY)
                }
            }
        }
    };
};
