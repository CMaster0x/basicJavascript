const triageTodos = (todo, todoElement) => {
    const currentTime = new Date();
    
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
};

const colorTodos = color => (todo, todoElement) => {
    todoElement.classList.remove('todo-element-red');
    todoElement.classList.remove('todo-element-orange');
    todoElement.classList.remove('todo-element-gray');
    todoElement.classList.add(`todo-element-${color}`);
};