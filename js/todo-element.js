function TodosElement(name, containerId, renderCallback = null) {
    const getList = storageValue => {
        if (storageValue) {
            return JSON.parse(storageValue).map(todo => {
                todo.time = todo.time && new Date(todo.time);
                return todo;
            });
        }
        return [];
    };

    const setList = todoList => {
        return JSON.stringify(todoList);
    };

    this.name = name;
    this.storage = createStorage(this.name, getList, setList);
    this.todoList = createTodoList(this.storage);
    this.container = document.getElementById(containerId);
    this.render = createTodoRender(this, renderCallback);

    this.render();
}