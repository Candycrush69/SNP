const input = document.querySelector('#todo__input')
const btn = document.querySelector('#todo__add')
const list = document.querySelector('.todo__list')

btn.addEventListener('click', () => {
  const value = input.value
  sendName(value)
  input.value = ''
})

fetchTodo()

list.addEventListener('click', e => {
  const id = e.target.closest('li')?.dataset.id
  const tag = e.target.tagName
  const checked = e.target.checked;
  if (id && tag === 'INPUT') {
    checkTodo(id, checked)
  }

  if (id && tag === 'BUTTON') {
    e.target.closest('li').remove()
    removeTodo(id)
  }
})

function fetchTodo() {
  fetch('./php/todo.php')
    .then(res => res.json())
    .then(res => {
      list.innerHTML = ''
      res?.forEach(todo => {
        list.innerHTML += `
          <li class="todo__item" data-id='${todo.id}'>
            <input type="checkbox">
            <span>${todo.text}</span>
            <button class="item__remove">&times;</button>
          </li>
        `
      })
    })
}

function sendName(todo) {
  fetch('./php/todo.php', {
    method: 'POST',
    body: JSON.stringify({
      todo: todo
    })
  }).then(res => fetchTodo())
}

function checkTodo(id, checked) {
  fetch('./php/todo.php', {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      checked: checked
    })
  })
}

function removeTodo(id) {
  console.log(id);
  fetch('./php/todo.php', {
    method: 'DELETE',
    body: JSON.stringify({
      id: id,
    })
  })
}