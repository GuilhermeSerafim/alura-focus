const btAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const tarefas = []

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
