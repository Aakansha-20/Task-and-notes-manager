$(function() {
    let list=$('#list')
    fetchTodos(function(task){
        list.empty()
        for(t of task){
            list.append(createTask(t))
        }
    })
})