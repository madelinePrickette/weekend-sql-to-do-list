$(onReady);

function onReady() {
    getTasks();
    handleClicks();
}

function handleClicks() {
    $('#addTask').on('click', addTask);

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
    <tr>
        <td>${task.task}</td>
        <td>${task.status}</td>
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
}