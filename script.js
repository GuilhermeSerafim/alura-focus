//Elementos
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button'); //Array de botoes

//Musica
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

//Tempo
let tempoDecorridoEmSegundos = 5;
const btComecar = document.querySelector('#start-pause');
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

btFoco.addEventListener('click', () => {
    alterarContexto('foco'); //Como a função vem antes de adicionar, ela percorre o array de botoes e limpa os estilos
    btFoco.classList.add('active'); //Logo em seguida, adiciona se caso ele for clicado (a ultima etapa)
    //Até outro ser clicado e esse ser removido no foreach do alterarContexto
})

btCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    btCurto.classList.add('active');
})

btLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    btLongo.classList.add('active');
})

//Identificamos código repetido, logo criamos uma função para deixar o código mais inxtuo
function alterarContexto(contexto) {
    //Criado para limpar os estilos dos botões anteriores
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    //O Inner html também é usado para fazer lista com +=
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade, <br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal da uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar();
        alert('Tempo finalizado');
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    console.log("Temporizador: " + tempoDecorridoEmSegundos);
}

btComecar.addEventListener('click', iniciar);

function iniciar() {
    //Sempre vai executar alguma função em um determinado periodo de tempo
    intervaloId = setInterval(contagemRegressiva, 1000); 
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}