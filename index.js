var formButton = document.getElementById("formJumbotronTitle");   
var form = document.getElementById("form");   


function disappear(){

    console.log("this is working")
    
    form.style.opacity=1;
    form.style.transition='0.6s';
    formButton.style.opacity=0;
    form.style.visibility= "visible";
}

