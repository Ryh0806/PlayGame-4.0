// ===============================
// CONFIGURAÇÃO INICIAL
// ===============================

// Só executa lógica de jogo se estiver na game.html
let nomeUser = localStorage.getItem("nomeUser");
let nivel = localStorage.getItem("nivel");

let max = 10;
let tentativasMax = 3;

if (nivel === "facil") {
    max = 10;
    tentativasMax = 3;
}
else if (nivel === "medio") {
    max = 50;
    tentativasMax = 3;
}
else if (nivel === "dificil") {
    max = 100;
    tentativasMax = 3;
}

// Número secreto baseado no nível
let numSec = Math.floor(Math.random() * max) + 1;
console.log("Número secreto:", numSec);

let jogoRyh = true;
let tentativas = 0;

// Áudios
let acerto = document.getElementById("acerto");
let erro = document.getElementById("erro");
let carregando = document.getElementById("carregando");
let gameOver = document.getElementById("gameOver");

// ===============================
// TELA INICIAL
// ===============================

function iniciaJogo() {

    nomeUser = document.getElementById("nomeUser").value;

    localStorage.setItem("nomeUser", nomeUser);

    window.location.href = "game.html";
}

// ===============================
// INICIAR RODADA
// ===============================

function start() {

    if (!jogoRyh) return;

    document.getElementById("batata").innerText =
        nomeUser + ", aguardando resultado...";

    document.getElementById("case").src =
        "https://media1.tenor.com/m/02KmY0GLX1EAAAAd/clash-royale.gif";

    carregando.currentTime = 0;
    carregando.play();

    setTimeout(verificarResultado, 1000);
}

// ===============================
// VERIFICAR RESULTADO
// ===============================

function verificarResultado() {

    if(erro){
        erro.pause();
        erro.currentTime = 0;
    }
    if(carregando){
        carregando.pause();
        carregando.currentTime = 0;
    }
    if(acerto){
        acerto.pause();
        acerto.currentTime = 0;
    }

    let palpite = parseInt(document.getElementById("adicione").value);

    if (isNaN(palpite)) {
        document.getElementById("batata").innerText =
            "Digite um número válido!";
        return;
    }

    tentativas++;

    // ACERTO
    if (numSec == palpite) {

        document.getElementById("batata").innerText =
            nomeUser + ", Parabéns, você acertou!!";

        document.getElementById("case").src =
            "https://img.redbull.com/images/c_crop,x_617,y_0,h_550,w_440/c_fill,w_450,h_600/q_auto,f_auto/redbullcom/2018/03/02/05de37dc-5683-4220-8610-617fff18c985/clash-royale-segundo-aniversario";

        acerto.currentTime = 0;
        acerto.play();

        jogoRyh = false;
    }

    // ERRO
    else {

        // GAME OVER
        if (tentativas >= tentativasMax) {

            document.getElementById("batata").innerText =
                nomeUser + ", Game over! Você perdeu o jogo.";

            document.getElementById("case").src =
                "https://i.ytimg.com/vi/-kbb0ymaC24/sddefault.jpg";

            gameOver.currentTime = 0;
            gameOver.play();

            jogoRyh = false;
        }

        // DICAS
        else if (numSec > palpite) {

            document.getElementById("batata").innerText =
                nomeUser + ", O número deve ser maior";

            document.getElementById("case").src =
                "https://fbi.cults3d.com/uploaders/42618401/illustration-file/f77f9587-35ac-4152-a950-cc0754ecd9cb/1.png";

            erro.currentTime = 0;
            erro.play();
        }

        else if (numSec < palpite) {

            document.getElementById("batata").innerText =
                nomeUser + ", O número deve ser menor";

            document.getElementById("case").src =
                "https://fbi.cults3d.com/uploaders/42618401/illustration-file/f77f9587-35ac-4152-a950-cc0754ecd9cb/1.png";

            erro.currentTime = 0;
            erro.play();
        }
    }
}

// ===============================
// RESET
// ===============================

function reset() {

    window.location.reload();


}
