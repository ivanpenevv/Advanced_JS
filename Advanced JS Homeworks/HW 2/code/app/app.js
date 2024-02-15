const reminders = [];

function addReminder() {
  const title = document.getElementById('title').value;
  const priority = document.getElementById('priority').value;
  const color = document.getElementById('color').value;
  const description = document.getElementById('description').value;

  const reminder = { title, priority, color, description };
  reminders.push(reminder);

  document.getElementById('title').value = '';
  document.getElementById('priority').value = 'Low';
  document.getElementById('color').value = '#000000';
  document.getElementById('description').value = '';

  console.log('Reminder added:', reminder);
}

function showReminders() {
  const tableBody = document.querySelector('#reminderTable tbody');
  tableBody.innerHTML = '';

  reminders.forEach(reminder => {
    const row = tableBody.insertRow();
    const titleCell = row.insertCell(0);
    const priorityCell = row.insertCell(1);
    const descriptionCell = row.insertCell(2);

    titleCell.innerText = reminder.title;
    priorityCell.innerText = reminder.priority;
    descriptionCell.innerText = reminder.description;

    titleCell.style.color = reminder.color;
  });
}