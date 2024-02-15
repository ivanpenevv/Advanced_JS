// Task 1
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(todo => {
    console.log('Task 1 - Todo with id 1:', todo);
  })
  .catch(error => console.error('Error fetching todo:', error));

// Task 2
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(todo => {
    console.log('Task 2 - Todo with id 1:', todo);

    const userId = todo.userId;

    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  })
  .then(response => response.json())
  .then(user => {
    console.log('Task 2 - User details:', user);
  })
  .catch(error => console.error('Error fetching todo or user details:', error));
