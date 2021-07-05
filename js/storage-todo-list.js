const storageTodoList = (function () {
    // Should return an array from the localStorage
    const get = name => () => {
        if (localStorage[name]) {
            return JSON.parse(localStorage[name]).map(todo => {
                todo.time = todo.time && new Date(todo.time);
                return todo;
            });
        }
        return [];
    }

    // Should save an array to the localStorage
    const set = name => todoList => {
        var stringTodoList = JSON.stringify(todoList);
        localStorage[name] = stringTodoList;
    }

    const getOngoing = get('ongoingTodoList');
    const getIncomplete = get('incompleteTodoList');
    const getCompleted = get('completedTodoList');
    
    // Should save an array to the localStorage
    const setOngoing = set('ongoingTodoList');
    const setCompleted = set('completedTodoList');
    const setIncomplete = set('incompleteTodoList');

    return {
        getOngoing,
        getIncomplete,
        getCompleted,
        setOngoing,
        setCompleted,
        setIncomplete
    };
})();