<template>
  <div class="add" @submit="addTodo">
    <h3>Add Todo:</h3>
    <form>
      <input type="text" v-model="title" placeholder="Add Todo...">
      <input type="submit" value="Submit" class="btn">
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddTodo',
  data() {
    return {
      title: '',
    }
  },
  methods: {
    ...mapActions(['postTodo']),
    addTodo(e) {
      e.preventDefault();
      this.postTodo(this.title);
      this.title = '';
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
}

input[type='text'] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: none;
}

input[type='submit'] {
  flex: 2;
  background-color: #41b883;
  color: #fff;
  border: 1px solid #41b883;
  cursor: pointer;
}
</style>