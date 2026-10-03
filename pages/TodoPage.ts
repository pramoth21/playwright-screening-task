import { Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;

  readonly todoInput;
  readonly todoItems;
  readonly todoCounter;

  readonly activeFilter;
  readonly completedFilter;
  readonly clearCompletedButton;

  constructor(page: Page) {
    this.page = page;

    this.todoInput = page.getByPlaceholder(
      'What needs to be done?'
    );

    this.todoItems = page
      .getByRole('list')
      .first()
      .getByRole('listitem');

    this.todoCounter = page.getByText(
      /\d+ items? left/
    );

    this.activeFilter = page.getByRole('link', {
      name: 'Active',
    });

    this.completedFilter = page.getByRole('link', {
      name: 'Completed',
    });

    this.clearCompletedButton = page.getByRole('button', {
      name: 'Clear completed',
    });
  }

  async goto() {
    await this.page.goto(
      'https://demo.playwright.dev/todomvc/'
    );
  }

  async addTodo(todo: string) {
    await this.todoInput.fill(todo);
    await this.todoInput.press('Enter');
  }

  async addTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  getTodo(todo: string) {
    return this.todoItems.filter({
      hasText: todo,
    });
  }

  async completeTodo(todo: string) {
    const item = this.getTodo(todo);

    await item.getByRole('checkbox').check();
  }

  async editTodo(oldText: string, newText: string) {
    const item = this.getTodo(oldText);

    await item.getByText(oldText).dblclick();

    const editInput = item.getByRole('textbox');

    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async deleteTodo(todo: string) {
    const item = this.getTodo(todo);

    await item.hover();

    await item.getByRole('button').click();
  }

  async showActiveTodos() {
    await this.activeFilter.click();
  }

  async showCompletedTodos() {
    await this.completedFilter.click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}