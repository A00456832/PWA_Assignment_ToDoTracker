if ('serviceWorker' in navigator) { 
    window.addEventListener('load', function () { 
        navigator.serviceWorker.register('/sw.js').then(function () { 
            console.log('ServiceWorker registration successful');  
            localStorage.setItem('assignmentDetailList', []);
        }, function (err) {
            console.log('ServiceWorker registration failed', err); 
        });
    }); 
}

async function main() {
// Get DOM elements
const form = document.querySelector('form');
let taskName_input = document.getElementById('taskName');
let dueDate_input = document.getElementById('dueDate');
let assignedTo_input = document.getElementById('assignedTo');
let assingmentList = document.getElementById('assingments');


// Side Effects / Lifecycle
//const existingAssignment = JSON.parse(localStorage.getItem('assignmentDetailList')) || [];

const existingAssignment = await getAllAssignmentDetailsFromDB();
const assingmentListData = [];
existingAssignment.forEach(assignment => {
    addAssignment(assignment.id, assignment.taskName, assignment.dueDate, assignment.assignedTo);
});


function addAssignment(id, taskName, dueDate, assignedTo) {
    var date = dueDate;
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    let stingDueDate = mm + '/' + dd + '/' + yyyy;

    const div = document.createElement('div');
    div.classList.add('assignmentCard');
    const h1 = document.createElement('h1');
    h1.innerHTML = taskName;
    const h2 = document.createElement('h2');
    h2.innerHTML = "Due Date: " + stingDueDate;
    const p = document.createElement('p');
    p.innerHTML = "Assigned: "+ assignedTo;

    assingmentListData.push({taskName, dueDate, assignedTo });
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(p);
    assingmentList.appendChild(div);


    localStorage.setItem('assignmentDetailList', JSON.stringify(assingmentListData));
    if (id === null ) {
        addAssignmentDetailsToDB(taskName, dueDate, assignedTo);
    } 

    taskName_input.value = '';
    dueDate_input.value = '';
    assignedTo_input.value = '';

}

  // Events
  form.onsubmit = (event) => {
    event.preventDefault();
    dueDate = new Date(dueDate_input.value);
    if (taskName_input.value && dueDate_input.value && assignedTo_input.value) {
        addAssignment(null, taskName_input.value, dueDate, assignedTo_input.value);
    } else {
        alert('Please fill all form details')
    }
    
}
}

main ().catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });
