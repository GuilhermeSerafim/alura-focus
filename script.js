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
const btComecarPausar = document.querySelector('#start-pause');
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

btFoco.addEventListener('click', () => {
    alterarContexto('foco'); //Limpa os estilos
    btFoco.classList.add('active'); //Adiciona o estilo de ativo em seguida
})

btCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    btCurto.classList.add('active');
})

btLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    btLongo.classList.add('active');
})

//Identificamos código repetido, logo criamos uma função para deixar o código mais inxuto
function alterarContexto(contexto) {
    //Limpando estilos
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })

    //Alterando contexto e texto
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
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
    //obs: O innerHTML também pode ser usado para fazer lista com +=
}

//Temporizador
btComecarPausar.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    //Criado para pausar
    if(intervaloId) { //Esta condição verifica se intervaloId possui um valor
        zerar();
        return; 
    }
    intervaloId = setInterval(contagemRegressiva, 1000); //Loop que executa a função de acordo com determinado tempo
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar();
        alert('Tempo finalizado');
        return; //O return é usado encerrar a execução de uma função
    }
    tempoDecorridoEmSegundos -= 1; //Decremento
    console.log("Temporizador: " + tempoDecorridoEmSegundos);
}