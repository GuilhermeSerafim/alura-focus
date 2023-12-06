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
    //O que o js fez por debaixo dos panos, é pegar o array de objetos tarefas, e colocar toString
    localStorage.setItem('tarefas', tarefas);
    //Resultado: tarefas: object Object
    //Para resolver isso, vamos usar uma API
    //Em outras palavras, a API vai pegar um objeto e transformá-lo numa string de uma forma que consiga fazer o inverso depois - pegar a string e transformá-la num objeto.
});
