export async function getAllUsers() {
  const res = await fetch('/api/getUsers.php');
  const json = await res.json();
  return json;
 };

export async function getTaskUsingUserID(idUser) {
  const res = await fetch(`/api/getTasks.php?id=${idUser}`);
  const json = await res.json();
  return json;
  };

export async function createTask(formdata) {
  const res = await fetch(`/api/createTask.php`,{
       method:"POST",
       body: formdata
  });
  const json = await res.json();
  return json;
  };

export async function deleteTask(taskId){
  console.log(taskId)
  const res = await fetch(`/api/deleteTask.php?id=${taskId}`);
  const json = await res.json();
  console.log(json);
  return json;
};

export async function getTask(taskId){
  const res = await fetch(`/api/getTask.php?id=${taskId}`);
  const json = await res.json();
  return json;
};

export async function updateTask(formdata, taskId) {
  const taskTitle = formdata.get('title');
  const userId = formdata.get('users');
  const completed = formdata.get('completed') === 'true'; 

  const taskRow = document.getElementById(`tablerow${taskId}`);
  const titleCell = taskRow.querySelector('td:nth-child(3)');
  const userCell = taskRow.querySelector('td:nth-child(2)');
  const completedCell = taskRow.querySelector('td:nth-child(4)');

  titleCell.textContent = taskTitle;
  userCell.textContent = userId;
  completedCell.textContent = completed ? 'Completed!' : 'Not completed';

  try {
    const res = await fetch(`/api/updateTask.php?id=${taskId}`, {
      method: "POST",
      body: formdata
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Error updating task:', error);
    return { error: 'Error updating task: Unexpected response from server' };
  }
}
