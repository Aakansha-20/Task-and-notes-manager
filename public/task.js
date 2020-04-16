function fetchTodos (done) {
    $.get('/todos', function (data) {
        done(data)
    })
}
function addTask(title,description,due,status,priority){
      $.post('/todos',{
        title:title,
        description:description,
        due:due,
        status:status,
        priority:priority}
        
      )
}
function addNoteforTask(id,text,done){
    $.post('/todos/'+id+'/notes',{
        text:text,
        task_id:id},
        function(data){
            done(data)
        
    })
}

function addNoteforTaskCard(id){

    let noteText=$('#noteText')
    addNoteforTask(
        id,
        noteText.val(),
        function(note){
            window.alert("Note Added")
            location.reload(true)
        }
    )
}
function createTaskCard(task,list){
    return $(`
    <div class="col-4 card mx-3 p-4" >
    <h4>${task.title}</h4>
    <div class="pb-3"><b>Notes:</b></div>
    <div class="row">
    &nbsp; ${list}
    </div>
    <div class="row">
      <input type="text" id="noteText" placeholder="Add new Note....">
      <button id="addNote" onclick="addNoteforTaskCard(${task.id}); " class="btn add">Add</button>
      <button type="button" class="btn cancel"  onclick="closeTaskCard()">Close</button>
      </div>
    </div>
    `)
}

function getTaskById(id,done) {
    $.get('/todos/'+id, function (data) {
        done(data)
    })
}
  
function createNoteList(notes){
    let list=[]
    for(note of notes){
        list.push(note.text)
    }
    console.log(list)
    return list
}

function getNotesByTaskId(id,done){
    $.get('/todos/'+id+'/notes',function(data){
        done(data)
    })
}


function getTaskforTaskCard(id){
    let taskCard=$('#taskCard')
    getTaskById(id,function(task){
        taskCard.empty()
        getNotesByTaskId(id,function(notes){
            taskCard.append(createTaskCard(task,createNoteList(notes)))
        })
    })
}
function openTaskCard(){
    document.getElementById("taskCard").style.display = "block";
}


function closeTaskCard() {

    document.getElementById("taskCard").style.display = "none";
}

function updateTask (id,title, description, due, status, priority, done) {
    $.ajax({
        url: '/todos/'+id,
        type: 'PATCH',
        data: {
            title: title,
            description : description,
            due : due,
            status : status,
            priority : priority
        },
        success: function (data) {
            done(data)
        }
     })
}

function createTask(task,nid){
    return $(`
    <div class="card">
      <div class="card-header">
      <div class="btn btn-default btn-lg btn-block">
      <button type="button" class="btn btn-default btn-lg btn-block  aria-expanded="false"  data-toggle="collapse" data-target="#${task.id}" >${task.title}</button>
      </div>
      </div>
      <div class="card-body">
      <div id="${task.id}" class="collapse" class="collapse show">
      <div class="col"></div>
       <div class="col-4">
       &nbsp; <b>Description:</b> &nbsp; <p>${task.description}</p>
       &nbsp; <b>Due Date:</b>&nbsp;<p>${task.due}</p>
       &nbsp; <b>Status;</b>&nbsp;<p><input type="checkbox" id="myCheck" disabled checked>${task.status}</p>
       &nbsp; <b>Priority:</b>&nbsp;<p>${task.priority}</p>
       &nbsp;<button type="button" class="btn btn-danger" onclick="getTaskforTaskCard(${task.id}); openTaskCard(); ">Add Notes</button>
       <button class="btn btn-success" id="updateTask" onclick="openUpdateForm(${task.id}) " data-target="#updateForm">Update Task</button>
       </div>
       <div class="col-4"></div>
     </div>
    </div>
    </div>
    
    `)
}



