let params = {}

let regex = /([^&=]+)=([^&]*)/g, m

while(m = regex.exec(location.href)){
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
}

if(Object.keys(params).length > 0){
    localStorage.setItem('authInfo', JSON.stringify(params))
}

//................................

window.history.pushState({},document.title, "/" + "profile")

let info = JSON.parse(localStorage.getItem('authInfo'))
console.log(JSON.parse(localStorage.getItem('authInfo')))
console.log(info['access_token'])
console.log(info['expires_in'])

fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers:{
        "Authorization":`Bearer ${info['access_token']}`
    }
})
.then((data) => data.json())
.then((info) => {
    console.log(info)
    document.getElementById('name').innerHTML += info.name
    document.getElementById('image').setAttribute('src', info.picture)
    document.getElementById('head-image').setAttribute('src', info.picture)
})


function goToIndex() {
        window.location.href = '/index';
    }

    function logout() {
    localStorage.removeItem('isRegistered');

fetch("https://oauth2.googleapis.com/revoke?token=" + info['access_token'], {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to revoke token');
        }
        // Successful token revocation
        localStorage.removeItem('authInfo'); // Remove authInfo from localStorage
        updateRegisterButton(); // Update the register button on the main page
        location.href = "http://localhost:5000/profile"; // Redirect to index.html
    })
    .catch(error => {
        console.error('Error revoking token:', error);
        // Handle error as needed, e.g., show an error message to the user
    });
    window.location.href = '/register';
}

// Function to update the register button on the main page
function updateRegisterButton() {
const isRegistered = localStorage.getItem('isRegistered');
const registerButton = document.getElementById('registerButton');

if (isRegistered === 'true') {
    registerButton.innerHTML = '<a href="/profile"> Ваш профіль </a>';
} else {
    registerButton.innerHTML = '<a href="/register">Register</a>';
}
}

// Update the register button when the page loads
window.onload = function() {
updateRegisterButton();
};


document.getElementById('settingBtn').addEventListener('click', function() {
    var hiddenBlock = document.getElementById('hiddenCenterBlock');
    
    // Перевіряємо, чи блок видимий, і змінюємо його видимість
    if (hiddenBlock.style.display === 'none') {
        hiddenBlock.style.display = 'block';
        document.getElementById('settingBtn').classList.add('selected');
    } else {
        hiddenBlock.style.display = 'none';
        document.getElementById('settingBtn').classList.remove('selected');
    }
});

document.getElementById('accountSettingBtn').addEventListener('click', function() {
    var hiddenBlock = document.getElementById('hiddenRigthBlock');
    
    // Перевіряємо, чи блок видимий, і змінюємо його видимість
    if (hiddenBlock.style.display === 'none') {
        hiddenBlock.style.display = 'block';
        document.getElementById('accountSettingBtn').classList.add('selected');
    } else {
        hiddenBlock.style.display = 'none';
        document.getElementById('accountSettingBtn').classList.remove('selected');
    }
});

