var slideIndex = 0;
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}
function review() {
    let isLogged = localStorage.getItem("isLogged");
    let user = findUser(JSON.parse(localStorage.getItem('login')),isLogged);
    let x = document.getElementById("textarea");
    let y = "<h4>"+x.value+"- by "+user[0].firstName+"</h4>";
    document.getElementById("demo").innerHTML += y;
    x.value = "";
}
function findUser(users,username){
    let data = [];
    if(users != null){
        if(users.length >= 1 && users[0] != null){
            for(var i in users){
                if(users[i].login == username){
                    data.push(users[i]);
                }
            }
        }
    }
    return data;
}
// function showSlides(){
//     var slide = location.hash.substring(4,6);
//     slide = slide != "" ? slide : "1";
//     slide = parseInt(slide);
//     if(slide >= 10){
//         slide = 1;
//     }else{
//         slide += 1;
//     }

//     window.location.href = '#img'+slide;
//     setTimeout(showSlides, 5000); // Change image every 2 seconds
// }

/*
var slides = document.getElementById("content").children;
*/