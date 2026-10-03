import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC', () => {

  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);

    await todoPage.goto();
  });


  test('1. Add 3 todos', async () => {

    await todoPage.addTodos([
      'Learn Playwright',
      'Learn TypeScript',
      'Build automation tests',
    ]);

    await expect(todoPage.todoItems).toHaveCount(3);
  });


  test('2. Complete one todo and check counter', async () => {

    await todoPage.addTodos([
      'Learn Playwright',
      'Learn TypeScript',
      'Build automation tests',
    ]);

    await todoPage.completeTodo('Learn Playwright');

    await expect(todoPage.todoCounter).toHaveText(
      '2 items left'
    );
  });


  test('3. Active and Completed filters work', async () => {

    await todoPage.addTodos([
      'Learn Playwright',
      'Learn TypeScript',
      'Build automation tests',
    ]);

    await todoPage.completeTodo('Learn Playwright');


    // Active todos
    await todoPage.showActiveTodos();

    await expect(
      todoPage.getTodo('Learn Playwright')
    ).not.toBeVisible();

    await expect(
      todoPage.getTodo('Learn TypeScript')
    ).toBeVisible();

    await expect(
      todoPage.getTodo('Build automation tests')
    ).toBeVisible();


    // Completed todos
    await todoPage.showCompletedTodos();

    await expect(
      todoPage.getTodo('Learn Playwright')
    ).toBeVisible();

    await expect(
      todoPage.getTodo('Learn TypeScript')
    ).not.toBeVisible();

    await expect(
      todoPage.getTodo('Build automation tests')
    ).not.toBeVisible();
  });


  test('4. Edit a todo', async () => {

    await todoPage.addTodo('Learn Playwright');

    await todoPage.editTodo(
      'Learn Playwright',
      'Master Playwright'
    );

    await expect(
      todoPage.getTodo('Master Playwright')
    ).toBeVisible();
  });


  test('5. Delete a todo', async () => {

    await todoPage.addTodos([
      'Learn Playwright',
      'Learn TypeScript',
      'Build automation tests',
    ]);

    await todoPage.deleteTodo('Learn TypeScript');

    await expect(
      todoPage.getTodo('Learn TypeScript')
    ).toHaveCount(0);

    await expect(todoPage.todoItems).toHaveCount(2);
  });


  test('6. Clear completed removes only completed todos', async () => {

    await todoPage.addTodos([
      'Learn Playwright',
      'Learn TypeScript',
      'Build automation tests',
    ]);

    await todoPage.completeTodo('Learn Playwright');

    await todoPage.clearCompleted();

    await expect(
      todoPage.getTodo('Learn Playwright')
    ).toHaveCount(0);

    await expect(
      todoPage.getTodo('Learn TypeScript')
    ).toBeVisible();

    await expect(
      todoPage.getTodo('Build automation tests')
    ).toBeVisible();

    await expect(todoPage.todoItems).toHaveCount(2);
  });

  test('Bonus: Add multiple todos from an array', async () => {

  const todos = [
    'Learn Playwright',
    'Learn TypeScript',
    'Learn API Testing',
    'Learn CI/CD',
  ];

  await todoPage.addTodos(todos);

  await expect(todoPage.todoItems).toHaveCount(
    todos.length
  );
});

});