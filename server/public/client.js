console.log('JS')

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('#addTaskButton').on('click', addTask);
}

function addTask() {
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
        //gettasks();
    }).catch(function(error) {
        console.log('error in the task post', error);       
    });
}