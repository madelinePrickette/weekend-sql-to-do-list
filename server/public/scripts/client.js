$(onReady);

function onReady() {
    getTasks();
    handleClicks();
}

function handleClicks() {
    $('#addTask').on('click', addTask);
    //DYNAMIC LISTENER
    $('#tableBody').on('click', '.deleteButton', handleDelete)
}

function getTasks() {
    console.log('in /GET...');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function(response) {
        console.log(response);
        renderTasks(response);
    }).catch( function(err) {
        console.log(err);
        alert('error in GET');
    })
};

function renderTasks(response) {
    console.log('rendering tasks...');
    $('#tableBody').empty();
    for(task of response){
    $('#tableBody').append(`
    <tr data-id=${task.id} data-status=${task.status}>
        <td>${task.task}</td>
        <td>${task.status}</td>
        <td><button class="completeButton">Complete</button></td>
        <td><button class="deleteButton">Delete</button></td>
    </tr>
    `)
    }
};

function addTask() {
    console.log('in /POST...');
    let taskOjb = {
        task: $('#taskIn').val()
    };
    console.log(taskOjb);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskOjb
    }).then( function(response) {
        console.log(response);
        getTasks(response);
    }).catch( function (err) {
        console.log(err);
        alert('Error in POST');
    });
    $('#taskIn').val('');
}

function handleDelete() {
    console.log('clicked delete');
    const id = $(this).closest('tr').data('id');
    console.log(id); //check
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then( function(response) {
        console.log(response);
        getTasks(response);
    }).catch( function(err) {
        console.log(err);
        alert('Error in /DELETE...');
    });
}