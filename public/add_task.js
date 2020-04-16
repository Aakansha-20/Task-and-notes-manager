$(function(){
    let title=$('#title')
    let description=$('#description')
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var tomday = tomorrow.getDate();
    var tommonth = tomorrow.getMonth() + 1;
    var tomyear = tomorrow.getFullYear();
    if(tomday<10){tomday='0'+tomday} if(tommonth<10){tommonth='0'+tommonth} tomorrow = tomyear+'-'+tommonth+'-'+tomday;
    $('#date').attr('value', tomorrow);
    let due=$('#date')
    let status=$('#status')
    let priority=$('#priority')
    $('#addTask').click(function(){
        addTask(
            title.val(),
            description.val(),
            due.val(),
            status.val(),
           priority.val(),
           
        )
    })
})