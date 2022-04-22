console.log('JS')

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('#addTaskButton').on('click', addTask);
}

function addTask() { // POST
    // Get info to send to the server
    const taskWePost = {
        task: $('#createATask').val(), 
        //call this taskWeAdd sometime?
    };$.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskWePost
    }).then(function(response) {
        console.log(response);
    }).catch(function(error) {
        console.log('error in the task post', error);       
    });
    refreshTasks();
}

function refreshTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
    }).catch(function(error){
        console.log('error in client', error);
    });
}