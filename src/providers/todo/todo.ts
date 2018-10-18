import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private todos = [];
  private archivedTodos = [];
  
  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  getTodos(){
    return this.todos;
  }

  addTodo(todo){
    this.todos.push(todo);
  }

  archiveTodo(todoIndex){
    let todoBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    this.archivedTodos.push(todoBeArchived);
  }

  getArchivedTodos(){
    return this.archivedTodos;
  }

  editTodo(todoIndex, todoText){
    this.todos[todoIndex] = todoText;
  }
}
