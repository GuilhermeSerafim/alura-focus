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
    tempoDecorridoEmSegundos = 1500; //Para teste 
    alterarContexto('foco');
    btFoco.classList.add('active'); // Adiciona o estilo de ativo
})

btCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btCurto.classList.add('active');
})

btLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    btLongo.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    // Limpa os estilos removendo a classe 'active' de todos os botões
    listaDeBotoes.forEach((estilosASeremRemovidos) => {
        estilosASeremRemovidos.classList.remove('active');
    })

    // Altera o contexto e o texto
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
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
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Temporizador
const iniciarAudio = new Audio('sons/play.wav');
const pausarAudio = new Audio('sons/pause.mp3');
const finalizadoAudio = new Audio('sons/beep.mp3');
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
        finalizadoAudio.play();
        zerar();
        alert('Tempo finalizado');
        //Se o contexto atual for foco
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';

        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            //Broadcast | O evento é "disparado" ou "transmitido" para todo o documento
            document.dispatchEvent(evento);
        }
        return; // O return é usado encerrar a execução de uma função
    }
    tempoDecorridoEmSegundos -= 1; // Decremento
    mostrarTempo();
}

function mostrarTempo() {
    // tempoDecorridoEmSegundos é mudado quando um novo contexto é escolhido.
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' });
    temporizadorNaTela.innerHTML = `${tempoFormatado}`;
}

// Usado para mostrar estaticamente. Escopo global
mostrarTempo();
