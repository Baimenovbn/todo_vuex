<template>
  <div>
    <h3>Todos</h3>
    <div class="todos">
      <div 
      @dblclick="onToggle(todo)" 
      @mousedown.prevent="" 
      class="todo" 
      :class="{completed: todo.completed}" 
      :key="todo.id" v-for="todo in allTodos"
      >
        {{ todo.title }}
        <i class="fas fa-trash-alt"  @click="onDelete(todo.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Todos',
    computed: mapGetters(['allTodos']),
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'toggleCompletion']),
        onDelete(id) {
          this.deleteTodo(id);
        },
        onToggle(todo) {
          console.log(todo)
          this.toggleCompletion(todo);
        },
    },
    created() {
        this.fetchTodos();
    }
}
</script>

<style scoped>
.todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.todo {
    position: relative;
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
}

.completed {
  background-color: darkgreen;
}
</style>
