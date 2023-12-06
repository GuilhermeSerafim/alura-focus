const btAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
//Se, por algum motivo, o localStorage retornou nulo, o nulo não vai quebrar o JSON.parse(), por isso usamos o '|| []'
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const ulTarefas = document.querySelector('.app__section-task-list');

//Recebe uma tarefa e devolve um HTML que representa essa tarefa.
function criarElementoTarefa(tarefa) {
    //Criando elementos da lista
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = 
    `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    const imgBotao = document.createElement('img');
    imgBotao.setAttribute('src', "/imagens/edit.png");

    //Posicionando
    botao.append(imgBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

btAdicionarTarefa.addEventListener('click', () => {
    //toggle faz a alternância de classe
    formAdicionarTarefa.classList.toggle('hidden');
});

formAdicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault();
    //Criando objeto que representa a tarefa
    const tarefa = {
        descricao: textArea.value //Pegando valor digitado e armazenando em uma chave
    }
    tarefas.push(tarefa);
    //Consumindo para conversão de dados
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});


tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});