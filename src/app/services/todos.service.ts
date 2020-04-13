import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  // todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(null);

  todos: Todo[] = [
    {
      id: 1,
      title: 'Напоить коня',
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: 'Побрить бороду',
      completed: false,
      editing: false
    },
    {
      id: 3,
      title: 'Жить бесконечно',
      completed: false,
      editing: false
    }
  ];

  constructor() { }

  /**
   * Добавляет итем в список дел
   */
  addTodo(titleTodo: string): void {
    const todo: Todo = {
      id: this.getId(),
      title: titleTodo,
      completed: false,
      editing: false
    };

    this.todos.push(todo);
  }

  /**
   * Изменяет итем в список дел
   */
  editTodo(todo: Todo): void {
    todo.editing = true;
  }

  /**
   * Выходит из редактирвоания итема в списке дел
   */
  doneEdit(todo: Todo): void {
    todo.editing = false;
  }

  /**
   * Удаляет итем в списке дел
   */
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(item => item.id !== id);
  }

  /**
   * Удаляет выполненные итемы
   */
  deleteAllCompleted(): void {
    this.todos = this.todos.filter(item => item.completed !== true);
    console.log(this.todos)
  }

  /**
   * Отмечает все итемы завершенными
   */
  checkAll(event: boolean): void {
    this.todos.forEach(item => {
      item.completed = event;
    });
  }
  /**
   * Генерируем ID
   */
  getId(): number {
    const id = Math.floor(Math.random() * (100 - this.todos.length)) + this.todos.length;
    const result = this.todos.find(item => {
      return item.id === id;
    });
    if (result) {
      this.getId();
    } else {
      return id;
    }
  }

  /**
   * Фильтрует итемы
   */
  filterTodos(mark: string) {
    switch (mark) {
      case 'all':
        return this.todos;
      case 'active':
        return this.todos.filter(item => !item.completed);
      case 'completed':
        return this.todos.filter(item => item.completed);
    }
  }

}
