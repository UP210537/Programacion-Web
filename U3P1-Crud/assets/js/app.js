const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');
const formTitle = document.getElementById('form-title')
const completedCheckbox = document.getElementById('completed');
const submitButton = document.getElementById('insert');
let pressedButtonId;
import { deleteTask, createTask, getAllUsers,getTaskUsingUserID, getTask, updateTask } from "./petitions.js";

document.addEventListener('DOMContentLoaded',async ()=>{
    const allUsers = await getAllUsers();
    let template=listUsers.innerHTML;
    for (const user of allUsers) {
        template = template + `
        <option value="${user.id}">${user.fullname}</option>
        `
    }
    listUsers.innerHTML = template;
});

listUsers.addEventListener('change',async ()=>{
  const userTasks = await getTaskUsingUserID(listUsers.value);
  console.log(userTasks)
  let template = "";
  const tableBody = taskTable.children[1];
  for (const task of userTasks){
    let taskCompleted = "Sin completar"
    if (task.completed) {
      taskCompleted = "Completado"
    }
    template = template + `
    <tr id=tablerow${task.id}>
    <td>${task.id}</td>
    <td>${task.firstname}</td>
    <td>${task.title}</td>
    <td>${taskCompleted}</td>
    <td>
    <button class="btn btn-info btn-sm updateBtn" id="updateBtn${task.id}"> <span>Update</span> <i class="nf nf-md-pencil"></i></button>
    <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${task.id}"><span>Delete</span> <i class="nf nf-cod-trash"></i></button>
    </td>
    </tr>        `
  }
  tableBody.innerHTML = template
  addDeleteButtonEvents();
  addUpdateButtonEvents();
  submitButton.innerText= "Guardar";
  formTitle.innerText = "Insert Task";
  submitButton.setAttribute("id","insert");
  taskForm.children[0].children[0].value =``
});

taskForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const formData = new FormData(taskForm);
    const completedValue = completedCheckbox.checked ? parseInt(1) : parseInt(0);
    formData.append('completed', completedValue);
    console.log(formData);
    
    if (submitButton.id == 'insert'){
      console.log("Tarea asignada");
      try {
        const response = await createTask(formData);
        if (response.success) {
          console.log("JsonID",response.taskId)
          const taskInfo = await getTask(response.taskId)
          console.log("Informacion",formData)
          const newRow = document.createElement('tr');
          newRow.setAttribute("id",`tablerow${taskInfo.id}`)
          let taskCompleted = "Sin completar"
          if (taskInfo.completed) {
            taskCompleted = "Completada"
          }
          newRow.innerHTML = `
          <td>${taskInfo.id}</td>
          <td>${taskInfo.firstname}</td>
          <td>${taskInfo.title}</td>
          <td>${taskCompleted}</td>
          <td>
            <button class="btn btn-info btn-sm updateBtn" id="updateBtn${taskInfo.id}"><span>Update</span> <i class="nf nf-md-pencil"></i></button>
            <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}"><span>Delete</span> <i class="nf nf-cod-trash"></i></button>
          </td>
        `;
        taskTable.children[1].appendChild(newRow);
    
        addUpdateButtonEvents();
        taskForm.children[0].children[0].value =``

        const userTasks = await getTaskUsingUserID(listUsers.value);
        let template = "";
        const tableBody = taskTable.children[1];
        for (const task of userTasks){
          let taskCompleted = "Sin completar"
          if (task.completed) {
            taskCompleted = "Completada"
          }
          template = template + `
          <tr id=tablerow${task.id}>
          <td>${task.id}</td>
          <td>${task.firstname}</td>
          <td>${task.title}</td>
          <td>${taskCompleted}</td>
          <td>
          <button class="btn btn-info btn-sm updateBtn" id="updateBtn${task.id}"><span>Update</span> <i class="nf nf-md-pencil"></i></button>
          <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${task.id}"><span>Delete</span> <i class="nf nf-cod-trash"></i></button>
          </td>
          </tr>        `
        }
        tableBody.innerHTML = template;
      
      } else {
        console.error('Error al insertar la tarea');
        showMessage('danger', 'Error al insertar la tarea');
      }
    } catch (error) {
      console.error('Error insertando:', error);
      showMessage('danger', 'Error al insertar la tarea');
    };
  };

  if (submitButton.id == 'update'){
    console.log("Se ha actualizado la tarea correctamente");
    try {
      const response = await updateTask(formData,pressedButtonId)
      if (response.success) {
        const rowToUpdate = document.getElementById(`tablerow${pressedButtonId}`);
        const taskInfo = await getTask(pressedButtonId);
        let taskCompleted = "Sin completar"
        if (taskInfo.completed) {
          taskCompleted = "Commpletada"
        };
        rowToUpdate.innerHTML = `
        <td>${pressedButtonId}</td>
        <td>${taskInfo.firstname}</td>
        <td>${taskInfo.title}</td>
        <td>${taskCompleted}</td>
        <td>
        <button class="btn btn-info btn-sm updateBtn" id="updateBtn${taskInfo.id}"><span>Update</span> <i class="nf nf-md-pencil"></i></button>
        <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}"><span>Delete</span> <i class="nf nf-cod-trash"></i></button>
        </td>
        `;
        formTitle.innerText = "Insert Task";
        submitButton.innerText= "Guardar";
        submitButton.setAttribute("id","insert");
        taskForm.children[0].children[0].value =``
      
      } else {
        console.error("No hubo respuesta, error en la actualización de la tarea")
      }
    } catch (error) {
      console.error('Error en la actualización.', error);
    }
  };
    addDeleteButtonEvents();  
    addUpdateButtonEvents();
});


tableBody.addEventListener('click', async (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('update-task')) {
    const taskId = clickedElement.dataset.taskId;
    const taskData = await getTaskById(taskId);
    document.getElementById('task_id').value = taskData.id;
    document.getElementById('title').value = taskData.title;
    document.getElementById('description').value = taskData.description;
  }
});

function addDeleteButtonEvents(){
  const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(button =>{
        button.addEventListener('click', async ()=>{
            const taskId = button.id.replace('deleteBtn','');
            console.log(taskId)
            const row = document.getElementById(`tablerow${taskId}`);
            row.remove();
            await deleteTask(taskId);
        });
      });
}