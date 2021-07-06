const createTodoList = storage => {
    let currentList = storage.get();

    const order = todoList => {
        return todoList.sort(function(a, b) {
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

    const add = todo => {
        const todoList = [...currentList];
        todoList.push(todo);
        storage.set(order(todoList));
        currentList = storage.get();
    };

    const remove = index => {
        const todoList = currentList.filter((_, currentIndex) => currentIndex !== index);
        storage.set(order(todoList));
        currentList = storage.get();
    }

    const forEach = callback => {
        for (let i = 0; i < currentList.length; i++) {
            callback(currentList[i], i, currentList);
        }
    }

    return {
        add,
        remove,
        forEach
    };
}