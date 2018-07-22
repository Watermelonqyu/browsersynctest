import {getUsers} from './api/userApi';

getUsers().then(result => {
    let usersBody = '';

    result.forEach(user => {
        // Using ES6, so need to surround string with a back-tick
        usersBody += `<tr> 
            <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>    
            </tr>`;
    });

    global.document.getElementById('users').innerHTML = usersBody;
});