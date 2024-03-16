// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const tasksButton = document.getElementById('show-tasks-button'); // Nuevo: Agregamos el botón

// Event listener para detectar clic en opciones de usuario
userSelect.addEventListener('click', () => {
  const selectedUserId = parseInt(userSelect.value); // Obtenemos el ID del usuario seleccionado
  displayUserInfo(selectedUserId); // Llamamos a la función para mostrar la información del usuario seleccionado
});

// Event listener para mostrar tareas al hacer clic en el botón
tasksButton.addEventListener('click', () => {
  const selectedUserId = parseInt(userSelect.value); // Obtenemos el ID del usuario seleccionado
  displayUserTasks(selectedUserId); // Llamamos a la función para mostrar las tareas del usuario seleccionado
});

// Función para mostrar la información del usuario seleccionado
function displayUserInfo(userId) {
  // Obtenemos la lista de usuarios
  getAllUsers()
    .then(users => {
      // Buscamos el usuario seleccionado en la lista
      const selectedUser = users.find(user => user.id === userId);
      
      // Mostramos la información del usuario en el contenedor correspondiente
      userContainer.innerHTML = `
        <h3>Información del usuario seleccionado</h3>
        <ul>
          <li>Nombre completo: ${selectedUser.firstname} ${selectedUser.lastname}</li>
          <li>Email: ${selectedUser.email}</li>
        </ul>
      `;
    })
    .catch(error => {
      console.error('Error al obtener la información del usuario:', error);
    });
}

// Función para mostrar las tareas del usuario seleccionado
function displayUserTasks(userId) {
  // Obtenemos la lista de tareas
  getAllTasks()
    .then(tasks => {
      // Filtramos las tareas del usuario seleccionado
      const userTasks = tasks.filter(task => task.userId === userId);
      
      // Mostramos las tareas del usuario en el contenedor correspondiente
      taskContainer.innerHTML = `
        <h3>Lista de tareas del usuario</h3>
        <ul>
          ${userTasks.map(task => `<li><span>${task.title}</span><input type="checkbox" ${task.completed ? 'checked' : ''}></li>`).join('')}
        </ul>
      `;
    })
    .catch(error => {
      console.error('Error al obtener las tareas del usuario:', error);
    });
}

// Funciones para obtener la lista de usuarios y tareas
function getAllUsers() {
  return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

function getAllTasks() {
  return fetch('/data/tareas.json') // Suponiendo que tengas un archivo de tareas separado
    .then(resp => resp.json());
}
