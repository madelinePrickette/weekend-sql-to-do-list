$(onReady);

function onReady() {
    getTasks();
    handleClicks();
}

function handleClicks() {
    $('#addTask').on('click', addTask);
    //DYNAMIC LISTENER
    $('#tableBody').on('click', '.deleteButton', handleDelete) 
    // please look at my sweet alert function. I was gonna call it 
    // in the on click for delete and have it call the handleDelete
    // but things didnt work out. Please help!
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
            <td><button class="completeButton btn btn-success">Complete</button></td>
            <td><button class="deleteButton btn btn-danger">Delete</button></td>
        </tr>
        `)
        } else {
            $('#tableBody').append(`
        <tr data-id=${task.id} data-status=${task.status} class="green">
            <td>${task.task}</td>
            <td><button class="completeButton btn btn-success">Completed</button></td>
            <td><button class="deleteButton btn btn-danger">Delete</button></td>
        </tr>
        `)
        }
    }
};

// DOM 100% LOADED //

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

// function sweetAlertDelete() {
//     swal({
//         title: "Are you sure?", 
//         text: "You're about to delete a task! You can't get it back!", 
//         icon: "warning",
//         buttons: ["Go back", "I wish to proceed"]
//         })
//         .then((value) => {
//            console.log(value)
//            handleDelete();
//         })
//         // esc button on keyboard, clicking go back, and clicking outside of the modal gives numm value
//         // clicking proceed gives a true value

//         // If i did this, I dont know how to target the row.
//         // id comes back with undefined so therefore I cant find a way to
//         // send the id to pass it to the handleDelete so it can be
//         // used for the ajax request.
// }

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

    let taskStatus = {
        status: status
    };

        $.ajax({
            method: 'PUT',
            url: `/tasks/${id}`,
            data: taskStatus
        }).then(function (response) {
            console.log(response);
            getTasks(response);
        }).catch(function (err) {
            console.log(err);
            alert('Error in PUT...');
        });   
}