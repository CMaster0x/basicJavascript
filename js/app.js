document.addEventListener('DOMContentLoaded', function () {
    const ongoingTodosElement = new TodosElement('ongoing', 'ongoing-todo-container', triageTodos);
    const completeTodosElement = new TodosElement('complete', 'complete-todo-container', colorTodos('blue'));
    const incompleteTodosElement = new TodosElement('incomplete', 'incomplete-todo-container', colorTodos('gray'));

    ongoingTodosElement['complete'] = completeTodosElement;
    ongoingTodosElement['incomplete'] = incompleteTodosElement;

    completeTodosElement['ongoing'] = ongoingTodosElement;
    completeTodosElement['incomplete'] = incompleteTodosElement;

    incompleteTodosElement['ongoing'] = ongoingTodosElement;
    incompleteTodosElement['complete'] = completeTodosElement;

    const addTodoButton = document.getElementById('add-todo');

    addTodoButton.addEventListener('click', () => {
        const todoValueInput =  document.getElementById('todo-value');
        const todoTimeInput = document.getElementById('todo-time');

        ongoingTodosElement.todoList.add({
            value: todoValueInput.value,
            time: todoTimeInput.value && newTime(todoTimeInput.value)
        });
        ongoingTodosElement.render();
    });

    setInterval(() => {
        ongoingTodosElement.render();
    }, 1000)
});