document.addEventListener('DOMContentLoaded', function () {
    const addTodoButton = document.getElementById('add-todo');
    const todoValueInput =  document.getElementById('todo-value');
    const todoTimeInput = document.getElementById('todo-time');
    const ongoingTodoContainer = document.getElementById("ongoing-todo-container");
    const incompleteTodoContainer = document.getElementById("incomplete-todo-container");
    const completedTodoContainer = document.getElementById("completed-todo-container");
    
    let ongoingTodoList = storageTodoList.getOngoing();
    let incompleteTodoList = storageTodoList.getIncomplete();
    let completedTodoList = storageTodoList.getCompleted();
    
    const addTodo = todoList => todo => {
        todoList.push(todo);
    };  
    
    function removeTodo(elementIndex) {
        ongoingTodoList = ongoingTodoList.filter((_, index) => elementIndex !== index);
        //incompleteTodoList = incompleteTodoList.filter((_, index) => elementIndex !== index);
        //completedTodoList = completedTodoList.filter((_, index) => elementIndex !== index);
        saveAndRender();
    }

    const saveAndRender = () => {
        orderTodoList();
        storageTodoList.setOngoing(ongoingTodoList);
        renderTodoList(ongoingTodoList, ongoingTodoContainer);
    };

    // Aqui ordenamos los elementos que se crean al darle al render list
    function orderTodoList() {
        ongoingTodoList.sort(function(a, b) {
            if (a.time === b.time) {
                return 0;
            } else if (!b.time) {
                return -1;
            } else if (!a.time) {
                return 1;
            } else if (a.time > b.time) {
                return 1;
            } else if (a.time < b.time) {
                return -1;
            }
        });
    }

    // Aqui creamos los elementos html con sus respectivas caracteristicas y eventos
    const renderTodoList = todoList => container => () => {
        container.innerHTML = '';

        todoList.forEach((todo, index) => {
            const newParagraph = createAndAppend(container, 'p', todo.value);
            const removeButton = createAndAppend(newParagraph, 'button', 'Delete');

            newParagraph.classList.add('todo-element');
            newParagraph.setAttribute('draggable', true);
            newParagraph.addEventListener('dragstart', event => {
                event.dataTransfer.setData('Text', JSON.stringify({ index, todo }));
            });
            removeButton.addEventListener('click', () => removeTodo(index));
        });
        colorTodos();
    }
    /*
    function renderTodoList(todoList, container = null) {
        container.innerHTML = '';

        todoList.forEach((todo, index) => {
            const newParagraph = createAndAppend(container, 'p', todo.value);
            const removeButton = createAndAppend(newParagraph, 'button', 'Delete');

            newParagraph.classList.add('todo-element');
            newParagraph.setAttribute('draggable', true);
            newParagraph.addEventListener('dragstart', event => {
                event.dataTransfer.setData('Text', JSON.stringify({ index, todo }));
            });
            removeButton.addEventListener('click', () => removeTodo(index));
        });
        colorTodos();
    };*/

    // Caso de uso cuando se crea el todo sin tiempo y el orden de los colores por tiempo
    function colorTodos() {
        const currentTime = new Date();
        ongoingTodoList.forEach((todo, index) => {
            const todoElement = document.querySelector(`.todo-element:nth-of-type(${index + 1})`);
            switch(true) {
                case (!todo.time):
                    todoElement.classList.remove('todo-element-red');
                    todoElement.classList.remove('todo-element-orange');
                    todoElement.classList.remove('todo-element-gray');
                    break;

                case inTimeRange(todo.time, null, currentTime):
                    todoElement.classList.remove('todo-element-red');
                    todoElement.classList.remove('todo-element-orange');
                    todoElement.classList.add('todo-element-gray');
                    break;

                case inTimeRange(todo.time, currentTime, addToDate(currentTime, { minutes: 30})):
                    todoElement.classList.remove('todo-element-orange');
                    todoElement.classList.remove('todo-element-gray');
                    todoElement.classList.add('todo-element-red');
                    break;

                case inTimeRange(todo.time, addToDate(currentTime, { minutes: 30}), addToDate(currentTime, { hours: 2 })):
                    todoElement.classList.remove('todo-element-red');
                    todoElement.classList.remove('todo-element-gray');
                    todoElement.classList.add('todo-element-orange');
                    break;

                case inTimeRange(todo.time, addToDate(currentTime, { hours: 2}), null):
                    todoElement.classList.remove('todo-element-red');
                    todoElement.classList.remove('todo-element-orange');
                    todoElement.classList.remove('todo-element-gray');
                    break;
            }
        });
    }

    // Initialize    
    const addOngoingTodo = addTodo(ongoingTodoList);
    const addOincompleteTodo = addTodo(incompleteTodoList);
    const addOCompletedTodo = addTodo(completedTodoList);

    const renderOngoingTodoList = renderTodoList(ongoingTodoList)(ongoingTodoContainer);
    const renderIncompleteTodoList = renderTodoList(incompleteTodoList)(incompleteTodoContainer);
    const renderCompletedTodoList = renderTodoList(completedTodoList)(completedTodoContainer);
 
    renderOngoingTodoList();
    renderIncompleteTodoList();
    renderCompletedTodoList();

    addTodoButton.addEventListener('click', () => {
        addOngoingTodo({
            value: todoValueInput.value,
            time: todoTimeInput.value && newTime(todoTimeInput.value)
        });
        saveAndRender();
    });

    setInterval(colorTodos, 1000);
    
    //Seleccionamos la información del document, include los elementos del render
    const todoContainers = document.querySelectorAll(".todo-container");
    
    todoContainers.forEach(todoContainer => {
        todoContainer.addEventListener('dragover', event => event.preventDefault());
        todoContainer.addEventListener('drop', event => {
            event.preventDefault();
            const { todo, index } = JSON.parse(event.dataTransfer.getData('Text'));
            removeTodo(index);
            alert(`Remove ${todo.value} at index ${index}`);
        })
    })
});