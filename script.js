//Pegando elementos que vamos usar
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');

btFoco.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
})

btCurto.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
})

btLongo.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
})