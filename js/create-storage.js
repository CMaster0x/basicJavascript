const createStorage = (storageName, getFn, setFn) => {
    const get = name => () => {
        return getFn(localStorage[name]);
    }

    const set = name => todoList => {
        localStorage[name] = setFn(todoList);
    }

    return {
        get: get(storageName),
        set: set(storageName)
    };
};