const createTodoRender = (context, callback) => {
    context.container.addEventListener('dragover', event => event.preventDefault());
    context.container.addEventListener('drop', event => {
        event.preventDefault();
        const { todo, index, todoElementName } = JSON.parse(event.dataTransfer.getData('Text'));
        if (todoElementName === context.name) { return; }

        context[todoElementName].todoList.remove(index);
        context.todoList.add(todo);

        context[todoElementName].render();
        context.render();
    });

    return () => {
        context.container.innerHTML = '';

        context.todoList.forEach((todo, index) => {
            const todoElement = createAndAppend(context.container, 'p', todo.value);
            const removeButton = createAndAppend(todoElement, 'button', 'Delete');

            todoElement.classList.add('todo-element');
            todoElement.setAttribute('draggable', true);
            todoElement.addEventListener('dragstart', event => {
                event.dataTransfer.setData('Text', JSON.stringify({
                    todoElementName: context.name,
                    index,
                    todo
                }));
            });

            if (callback) {
                callback(todo, todoElement);
            }
            
            removeButton.addEventListener('click', () => {
                context.todoList.remove(index);
                context.render();
            });
        });
    }
};