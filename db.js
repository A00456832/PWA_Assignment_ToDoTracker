var db = new Dexie("assignmentDetailDB");

db.version(1).stores({
    assingments: `
    ++id,
    taskName,
    dueDate,
    assignedTo`,
});

function getAllAssignmentDetailsFromDB() {
    return db.assingments.toArray().then((data) => {
        return data;
    });
}

function addAssignmentDetailsToDB(taskName, dueDate, assignedTo) {
    db.assingments.put({taskName, dueDate, assignedTo })
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}
