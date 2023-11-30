//Pegando elementos que vamos usar
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

btFoco.addEventListener('click', () => {
    alterarContexto('foco');
})

btCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
})

btLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
})

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    //O Inner html também é usado para fazer lista com +=
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Que tal dar uma respirada? <br>
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