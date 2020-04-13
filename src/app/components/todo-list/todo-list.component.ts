import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { Todo } from 'src/app/model/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos = [];
  public todoTitle = '';
  public filter = 'all';

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.todos = this.todosService.todos;
  }

  /**
   * Добавлет итем в список дел
   */
  addTodo(): void {
    if (this.todoTitle.trim().length !== 0) {
      this.todosService.addTodo(this.todoTitle);
      this.todoTitle = '';
    }
  }

  /**
   * Редактирует итем в список дел
   */
  editTodo(todo: Todo): void {
    this.todosService.editTodo(todo);
  }

  /**
   * Выходит из редактирвоания итема в списке дел
   */
  doneEdit(todo: Todo): void {
    this.todosService.doneEdit(todo);
  }

  /**
   * Удаляет итем в списке дел
   */
  deleteTodo(id: number): void {
    this.todosService.deleteTodo(id);
    this.todos = this.todosService.todos;
  }

  /**
   * Возвращает число оставшихся итемов
   */
  remaining(): number {
   const result = this.todos.filter(item => !item.completed).length;
   return result;
  }

  /**
   * Отмечает все итемы завершенными
   */
  checkAll(event): void {
    this.todosService.checkAll(event.target.checked);
  }

  /**
   * Удаляет выполненные итемы
   */
  deleteAllCompleted(): void {
    this.todosService.deleteAllCompleted();
    this.todos = this.todosService.todos;
  }

  /**
   * Фильтрует итемы
   */
  filterTodos(): Todo[] {
    return this.todos = this.todosService.filterTodos(this.filter);
  }
}
