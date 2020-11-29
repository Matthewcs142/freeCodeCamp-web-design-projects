//accessing the form
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmation = document.getElementById('confirmation');

//Functions
//show error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success message
function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check required fields
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//check for valid email
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `A valid email is required`);
    }
}

//confirm passwords match
function checkPasswordsMatch(input1, input2, min, max) {
    if(input2.value.length < min) {
        showError(input2, `Passwords must be at least ${min} characters and match`);
    } else if(input2.value.length > max) {
        showError(input2, `Passwords must be less than ${max} characters and match`);
    } else if (input2.value.length !== input1.value.length) {
        showError(input2, `Passwords do not match`);
    } else {
        showSuccess(input2);
    }
}

//Event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username, email, password, confirmation]);
    checkLength(username, 8, 20);
    checkLength(password, 8, 20);
    checkEmail(email);
    checkPasswordsMatch(password, confirmation, 8, 20);
    

})  
