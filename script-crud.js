const btAdicionarTarefa = document.querySelector('.app__button--add-task');
const btCancelar = document.querySelector('.app__form-footer__button--cancel');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const btRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btRemoverTodasTarefas = document.querySelector('#btn-remover-todas');

//Se, por algum motivo, o localStorage retornou nulo, o nulo não vai quebrar o JSON.parse(), por isso usamos o '|| []'
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//Para saber se a tarefa foi selecionada, e desativar ela, se clicar novamente
let tarefaSelecionada = null; //objeto (chave:valor)
//Assim que finalizarmos o foco, usaremos essa variavel (tarefa completa)
let liTarefaSelecionada = null; //elemento li (html)

//Atualizando armazenamento local
function atualizarTarefa() {
    //Consumindo para conversão de dados
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

//Recebe uma tarefa e devolve um HTML que representa essa tarefa.
//Um foreach percorre essa função para criar todos os elementos que estão na localStorage, quando carregamos a pagina
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

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('app_button-edit');

    botaoEditar.onclick = () => {
        // debugger
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        if (novaDescricao) {
            //Atualizando camada visual - dom
            paragrafo.textContent = novaDescricao;
            //Atualizando camada de dados do objeto - tarefa
            tarefa.descricao = novaDescricao;
            //Atualizando armazenamento local - local storage
            atualizarTarefa();
        };
    }

    const imgBotao = document.createElement('img');
    imgBotao.setAttribute('src', "/imagens/edit.png");

    //Posicionando 
    botaoEditar.append(imgBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botaoEditar);

    //Como guardamos a chave completa no localStorage, manipulamos essa chave nessa função que vai ser percorrida por um for
    //E de acordo com o valor que estiver naquela tarefa, já vai vir recarregado com as alterações que desejamos
    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botaoEditar.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            //Movemos esse código, para que ele seja executado independente do if
            //Limpando estilos
            const todosElementosTarefas = document.querySelectorAll('.app__section-task-list-item');
            todosElementosTarefas.forEach(tarefa => {
                tarefa.classList.remove('app__section-task-list-item-active');

            });

            //Para tirar o texto 'em andamento' quando selecionarmos a mesma tarefa
            if (tarefaSelecionada == tarefa) {
                //Desselecionando tarefa se caso, a mesma for clicada novamente
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                //Early return
                return;
            }
            //Identificando tarefa da vez
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            //Adicionando estilo ativo | Selecionando tarefa
            li.classList.add('app__section-task-list-item-active');
        }
    }



    return li;
}

function cancelarTarefa() {
    textArea.value = "";
    formAdicionarTarefa.classList.add('hidden');
}

btCancelar.addEventListener('click', cancelarTarefa);

btAdicionarTarefa.addEventListener('click', () => {
    //toggle faz a alternância de classe
    formAdicionarTarefa.classList.toggle('hidden');
});

//Enviando tarefa para o array de tarefas, assim que enviado o form
formAdicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault();
    //Criando objeto que representa a tarefa
    const tarefa = {
        descricao: textArea.value //Pegando valor digitado e armazenando em uma chave
    }
    tarefas.push(tarefa);

    //Exibir tarefas assim que enviado o formulário
    const elementoTarefa = criarElementoTarefa(tarefa); //Criar
    ulTarefas.append(elementoTarefa); //Exibir
    atualizarTarefa();
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

//Iterando entre elementos já existentes na localStorage
//Exibir tarefas existentes
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

//Reagindo ao broadcast criado no script.js
document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        paragrafoDescricaoTarefa.textContent = '';
        //Criando outra chave, para referenciar quando ela estiver completa, e no fim atualizo o local storage
        tarefaSelecionada.completa = true;
        atualizarTarefa();
    }
});


const removerTarefas = (somenteCompletas) => {
    const seletorDeTarefasCompletas = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";
    document.querySelectorAll(seletorDeTarefasCompletas).forEach(tarefaConcluida => {
        //Removendo camada visual
        tarefaConcluida.remove();
    });
    //Removendo no armazenamento local
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefa();
}

btRemoverConcluidas.onclick = () => removerTarefas(true);

btRemoverTodasTarefas.onclick = () => removerTarefas(false);