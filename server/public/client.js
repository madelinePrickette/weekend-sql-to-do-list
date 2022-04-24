console.log('JS')

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    refreshTasks(); // This should load immediately so the user can see their tasks.
    $('#addTaskButton').on('click', addTask);
    // Below click listeners are for the newly addded buttons. It says "hey document, make sure to listen for this,
    // these buttons will appear later". the addTask button is populated with the DOM from the start.
    $('#viewList').on('click', '.deleteButton', deleteTask);
    // so the '#viewList is the location in which the deletion and button population will occour. The .deleteButton is seen 
    // /identified wihtin the parenthesis.
    $('#viewList').on('click', '.completeButton', completeStatus);
}

function addTask() { // POST
    // Get info to send to the server
    let taskWePost = {
        task: $('#createATask').val(), 
        //call this taskWeAdd sometime?
    };$.ajax({
        // This is teh package object that is sent to server
        method: 'POST',
        url: '/tasks',
        data: taskWePost
    }).then(function(response) {
        console.log(response);
    }).catch(function(error) {
        console.log('error in the task post', error);       
    });
    refreshTasks();
    $('#createATask').val(''); // Cleared tasks input
}; // End addTask SUCCESSFULLY WORKS!!!!!!!!!!!

function refreshTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        let el = $('#viewList');
        el.empty();
        for (let i=0; i<response.length; i++){
            el.append( `<li>${ response[i].task}
            <button class="completeButton" data-id="${response[i].id}">Complete Task</button>
            <button class="deleteButton" data-id="${response[i].id}">Delete</button>
            </li>`)
        }//end for loop for appending
        console.log(response);
    }).catch(function(error){
        console.log('error in client', error);
    });
}// End of refreshTasks a GET REQUEST it WORKS!!!!!!!

// Wait we need a click listener.. but where...?
function deleteTask() {
    const id = $(this).data('id');
    console.log('ok the delete button seems to be doing something... thats good', id); // console log WORKS!
    // Now we need an ajax function because we are on the client side.
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`
        // This url says what exactly it is targeting. I think...
    }).then( function(response){
        console.log('sent a delete request to the server', response);
        refreshTasks();
        // This will update the current list on the DOM
        // Now to handle errors gracefully...
    }).catch( function(error){
        console.log('there was an error when attempting to delete a task', error)
    })
};

function completeStatus(){
    // Targeting the id with the task we clicked the button on.
    const id = $(this).data('id');
    // Below we see this in the DOM console.log with the id of the task we clicked next to it.
    console.log('the toggle complete status button is working properly.', id);
    const toggleComplete =  $(this).data( 'complete?' ); //currently false
    console.log('lets see if we get a console.log back...', id, toggleComplete);
    // Time to ajax...
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: { completeStatus: !toggleComplete }
    }).then( function(response) {
        for (let i=0; i<response.length; i++){
        console.log('the server understands that the complete button has been pressed', response);
        refreshTasks();
        }
    }).catch(function (error){
        console.log('there was a problem while trying to update', error);
    }) // End of completeStatus successfully updted the status of completion.

}