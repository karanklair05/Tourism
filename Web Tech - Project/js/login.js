if(location.href.split("/").slice(-1) == "registration.html" && localStorage.getItem("isLogged") != null){
    alert("Do logout to register another person.")
    window.location.href = 'index.html'
}
function pageAccess(){
    if(localStorage.getItem("isLogged") == null){
        alert("This is a restrict content. Please do login to see this content.")
        window.location.href = 'index.html'
    }
}
function checkLogin(){
    let isLogged = localStorage.getItem("isLogged");
    if(isLogged == null){
        document.getElementById('login').style.display = '';
        document.getElementById('logged').style.display = 'none';
    }else{
        document.getElementById('login').style.display = 'none';
        document.getElementById('logged').style.display = '';
        let user = findUser(JSON.parse(localStorage.getItem('login')),isLogged);
        let name = user[0].firstName+" "+user[0].lastName
        let logged = `<h4>
                        <br>
                        <table width=100%>
                            <tr>
                                <td width=20%></td>
                                <td>
                                    Welcome ${name}
                                </td>
                                <td align="right">
                                    <input type="button" value="Logout" onclick="doLogout()">
                                </td>
                            </tr>
                        </table>
                    </h4>`
        document.getElementById('logged').innerHTML = logged;
    }
}
function doLogin(){
    readLocalStorage();
    checkLogin();
}
function doLogout(){
    localStorage.removeItem("isLogged");
    window.location.href = 'index.html'
    checkLogin();
}
function getLogin(){
    const usersArray = JSON.parse(localStorage.getItem("login"));
    console.log(usersArray)
    return usersArray;
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
function readLocalStorage(){
    let usersArray = getLogin();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let foundUser = findUser(usersArray,username);
    if(foundUser.length == 0){
        alert("User not registered, please make a registration.");
        // window.location.href = 'registration.html';
    }else if(foundUser.length != 0 && foundUser[0].password != password){
        alert("Wrong password. Please try another one.");
    }else{
        localStorage.setItem("isLogged",username);
        alert("Login successful!");
    }
}
function doRegistration(){
    let usersArray = getLogin();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("usernameForm").value;
    let password = document.getElementById("passwordForm").value;
    if(firstName == "" || lastName == "" || username == "" || password == ""){
        alert("All fields must be filled.")
    }else{
        if (findUser(usersArray,username).length >= 1){
            alert("There is already a register for usersame "+username);
        }else{
            console.log(usersArray)
            let user = {login:username,password:password,firstName:firstName,lastName:lastName};
            if(usersArray == null){
                usersArray = [];
            }
            usersArray.push(user);
            localStorage.setItem("login",JSON.stringify(usersArray));
            localStorage.setItem("isLogged",username);
            window.location.href = 'index.html';
        }
    }
}
