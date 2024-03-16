// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');

//Detección de clic en opciones de usuario
userSelect.addEventListener('click', () => {
  const selectedUserId = parseInt(userSelect.value); //Se obtiene el ID del usuario
  displayUserInfo(selectedUserId); //Se llama a la función para mostrar la información del usuario
});

//Función para mostrar la información del usuario
function displayUserInfo(userId) {
  //Se obtiene la lista de los usuarios
  getAllUsers()
    .then(users => {
      //Se va buscando el usuario en la lista
      const selectedUser = users.find(user => user.id === userId);
      
      //Se muestra la info del usuario
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

//Funciones para obtener la lista de usuarios y tareas
function getAllUsers() {
  return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

function getAllTasks() {
  return fetch('/data/tareas.json')
    .then(resp => resp.json());
}
