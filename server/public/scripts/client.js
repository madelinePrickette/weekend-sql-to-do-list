$(onReady);

function onReady() {
    getTasks();
    handleClicks();
}

function handleClicks() {
    $('#addTask').on('click', addTask);
    //DYNAMIC LISTENER
    $('#tableBody').on('click', '.deleteButton', handleDelete)
    $('#tableBody').on('click', '.completeButton', handleStatus)
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
        if (task.status === false){
        $('#tableBody').append(`
        <tr data-id=${task.id} data-status=${task.status}>
            <td>${task.task}</td>
            <td>${task.status}</td>
            <td><button class="completeButton">Complete</button></td>
            <td><button class="deleteButton">Delete</button></td>
        </tr>
        `)
        } else {
            $('#tableBody').append(`
        <tr data-id=${task.id} data-status=${task.status} class="green">
            <td>${task.task}</td>
            <td>${task.status}</td>
            <td><button class="completeButton">Complete</button></td>
            <td><button class="deleteButton">Delete</button></td>
        </tr>
        `)
        }
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
};

function handleStatus() {
    console.log('in /PUT... clicked complete');

    const id = $(this).closest('tr').data('id');
    console.log(id);

    const status = $(this).closest('tr').data('status');
    console.log(status);

    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: status
    }).then(function (response) {
        console.log(response);
        getTasks(response);
    }).catch(function (err) {
        console.log(err);
        alert('Error in PUT...');
    });
    
}