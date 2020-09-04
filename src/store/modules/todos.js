const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        let url = 'https://jsonplaceholder.typicode.com/todos';
        let response = await fetch(url);

        try {
            let todos = await response.json();
            commit('setTodos', todos)
        } catch(err) {
            console.log('Error has occurred:', err)
        }
    },

    async postTodo({ commit }, title) {
        try {
            let url = 'https://jsonplaceholder.typicode.com/todos';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title,
                    completed: false
                })
        });
            let todo = await response.json();
            commit('addTodo', todo);
        } catch(err) {
            console.log('Error has occurred:', err);
        }
    },

    async deleteTodo({ commit }, id) {
        let url = `https://jsonplaceholder.typicode.com/todos/${id}`;
        try {
            await fetch(url, { method: 'DELETE' });
            commit('removeTodo', id);
        } catch(err) {
            console.log('Error has occurred:', err);
        }
    },

    async filterTodos({commit}, e) {
        const limit = e.target.value;
        let url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`

        try {
            let response = await fetch(url);
            if (response.status === 200) {
                let todos = await response.json();
                commit('setTodos', todos);
            }
        } catch(err) {
            console.log('Error has occurred:', err);
        }
    },

    async toggleCompletion({ commit }, todo) {
        const url = `https://jsonplaceholder.typicode.com/todos/${todo.id}`;
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    ...todo,
                    completed: !todo.completed
                })
            });
            let updatedTodo = await response.json();
            commit('changeStatus', updatedTodo.id);
        } catch(err) {
            console.log(err.message)
        }
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    addTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    changeStatus: (state, id) => state.todos = state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
            ...todo,
            completed: !todo.completed,
        }
    })
};

export default {
    state,
    getters,
    actions,
    mutations
}
