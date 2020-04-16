$(function(){
    let taskId=$('#id')
    let taskTitle=$('#title')
    let taskDescription=$('#description')
    let taskDue=$('#date')
    let taskStatus=$('#status')
    let taskPriority=$('#priority')
    $('#updateTask').click(function () {
    updateTask(
        taskId.val(),
        taskTitle.val(),
        taskDescription.val(),
        taskDue.val(),
        taskStatus.val(),
        taskPriority.val(),
        function () {
            window.alert("Updated in Database")
            location.reload(true)
        }
    )
    })
})