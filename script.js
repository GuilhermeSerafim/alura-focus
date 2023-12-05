// Identificação dos elementos do DOM
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const listaDeBotoes = document.querySelectorAll('.app__card-button'); //Array de botoes

// Manipulando o dom da página inteira com os estilos e textos
btFoco.addEventListener('click', () => {
    alterarContexto('foco');
    btFoco.classList.add('active'); // Adiciona o estilo de ativo
})

btCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    btCurto.classList.add('active');
})

btLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    btLongo.classList.add('active');
})

// Identificamos código repetido, logo criamos uma função para deixar o código mais inxuto
function alterarContexto(contexto) {
    // Limpa os estilos removendo a classe 'active' de todos os botões
    listaDeBotoes.forEach((estilosASeremRemovidos) => {
        estilosASeremRemovidos.classList.remove('active');
    })

    // Altera o contexto e o texto
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

// Musica
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Temporizador
const iniciarAudio = new Audio('/sons/play.wav');
const pausarAudio = new Audio('/sons/pause.mp3');
const finalizadoAudio = new Audio('/sons/beep.mp3');
let tempoDecorridoEmSegundos = 1500;
const btComecarPausar = document.querySelector('#start-pause');
let intervaloId = null;
const iniciarOuPausarSpan = document.querySelector('#start-pause span');
const imgSpan = document.querySelector('.app__card-primary-butto-icon');
const temporizadorNaTela = document.querySelector("#timer");

btComecarPausar.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    // Criado para pausar
    if (intervaloId) { // Esta condição verifica se intervaloId possui um valor
        pausarAudio.play();
        zerar();
        return;
    }

    iniciarOuPausarSpan.textContent = "Pausar";
    console.log(imgSpan)
    imgSpan.setAttribute('src', `imagens/pause.png`);
    iniciarAudio.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

// Criado para o nosso criterio de contagemRegressiva voltar ao padrão
// E interromper o loop do setInverval
function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarSpan.textContent = "Começar";
    imgSpan.setAttribute('src', `imagens/play_arrow.png`);
    intervaloId = null;
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        // finalizadoAudio.play();
        zerar();
        alert('Tempo finalizado');
        return; // O return é usado encerrar a execução de uma função
    }
    tempoDecorridoEmSegundos -= 1; // Decremento
    mostrarTempo();
}

function mostrarTempo() {
    const tempo = tempoDecorridoEmSegundos;
    temporizadorNaTela.innerHTML = `${tempo}`;
}

//Usado para mostrar estaticamente
mostrarTempo(); //Escopo global
