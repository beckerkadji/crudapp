$('#add-user').submit( (e) => {
    alert("Data Inserted Successfully");
})

$('#update-user').on('submit', (e) => {
    e.preventDefault();
    let index_array = $('#update-user').serializeArray(); //Encode a set of form elements as an array of names and values.
    let data = {};

    $.map(index_array, (index_arrayData, index_arrayIndexe) =>{
    data[index_arrayData['name']] = index_arrayData['value'];
    })
    console.log(data);

    let request = {
        "url": `http://localhost:5000/omega/api/users/${data.id}`,
        "method": "PUT",
        "data" : data
    }

    $.ajax(request).done((response) => {
        alert("Data Updated Succefully !");
    });
})

$(document).on('click','.delete', function(){
    let id = $(this).attr('data-id');
    let request = {
        "url": `http://localhost:5000/omega/api/users/${id}`,
        "method": "DELETE"
    }
    if(confirm("Do you really want to delete this record ?")){
        $.ajax(request).done((response) => {
            alert("Data Deleted Succefully !");
            location.reload();
        });
    }
})
