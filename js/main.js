const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        status: document.querySelector("#status"),
    },
    values: {
        gameState: "play",
        stageTimer: null,
        ticVelocity: 1000,
        gameVelocity: 1000,
        timerID: null,
        currentTime: 30,
        countDownTimer: null,
        timeBuff: 5,
        timeDebuff: 30,
        result: 0,
        squareId: null,
        targetId: null,
        prefixo: "url('./img/",
        sufixo: ".png')",
        arquivo: "",

    }
};

/* function pausar() {
    if (state.values.gameState === "play") {
        state.values.gameState = "pause";
    } else {
        state.values.gameState = "play";
    };

}; */


function aceleraTempo() {
    state.values.gameVelocity -= 200;    
}

function passaFases() {
    state.values.stageTimer = setInterval(aceleraTempo, 500);    
}

function randomSquare() {
    return Math.floor(Math.random() * 9);
};

function randomTargt() {
    return Math.floor(Math.random() * (4) + 1);
};

function defineJanela() {
    state.view.squares.forEach((square) => {
        square.style.backgroundImage = null;
    });
    state.values.squareId = randomSquare();
    state.values.targetId = randomTargt();
    state.values.arquivo = state.values.prefixo + state.values.squareId + state.values.targetId + state.values.sufixo;
    state.view.squares[state.values.squareId].style.backgroundImage = state.values.arquivo;
};

function trocaJanela() {
    state.values.timerID = setInterval(defineJanela, state.values.gameVelocity);
    state.values.countDownTimer = setInterval(countDown, state.values.ticVelocity);

};

function sinal() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            playSound("pistol");
            if (square.id == 1 + state.values.squareId) {
                if (state.values.targetId === 4) {
                    perderPontos();

                } else {
                    ganharPontos();
                };
            } else {
                errar();
            };
        });
    });
};

function ganharPontos() {
    playSound("acertou");
    state.view.status.textContent = "Pega Ladrão!";
    state.values.result++;
    state.values.currentTime += state.values.timeBuff;
    state.view.score.textContent = state.values.result;
    state.view.squares[state.values.squareId].style.backgroundImage = null
    state.values.squareId = null;

};

function perderPontos() {
    playSound("vitima");
    state.view.status.textContent = "Olha a VÍTIMA!";
    state.values.result--;
    state.values.currentTime -= state.values.timeDebuff;
    state.view.score.textContent = state.values.result;
    state.view.squares[state.values.squareId].style.backgroundImage = null
    state.values.squareId = null;

};

function errar() {
    playSound("errou");
    state.view.status.textContent = "ERROU!";
}

function playSound(tipo) {
    let audio;
    switch (tipo) {
        case "pistol":
            audio = new Audio("./audio/pistol.mp3");
            audio.volume = 0.2;
            audio.play();

            break;
        case "acertou":
            audio = new Audio("./audio/acertou.wav");
            audio.play();

            break;
        case "errou":
            audio = new Audio("./audio/errou.wav");
            audio.volume = 0.8;
            audio.play();

            break;
        case "vitima":
            audio = new Audio("./audio/vitima.wav");
            audio.volume = 0.8;
            audio.play();

            break;
        case "fim":
            audio = new Audio("./audio/game_over.wav");
            audio.volume = 0.8;
            audio.play();

            break;
    }
}


function countDown() {
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        playSound("fim");
        clearInterval(state.values.timerID);
        clearInterval(state.values.countDownTimer);
        alert("O Tempo acabou! Você conseguiu: " + state.values.result + " pontos!");


    }
}

function jogar() {
    passaFases();
    countDown();
    trocaJanela();
};


function main() {
    sinal();
    jogar();
};

main();