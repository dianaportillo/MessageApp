const signupBtn = document.getElementById('signupBtn');
const signupUsernameInput = document.getElementById('signupUsernameInput');
const signupPasswordInput = document.getElementById('signupPasswordInput');
const signupRepeatPasswordInput = document.getElementById('signupRepeatPasswordInput');
const signupEmailInput = document.getElementById('signupEmailInput');

signupBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;
    const repeatPassword = signupRepeatPasswordInput.value;
    const username = signupUsernameInput.value;

    // checks that email is enterd 
    if (email.trim().length === 0) {
        alert('please enter valid email')
    }
    // checks to make sure username is not empty
    if (username.trim().length === 0) {
        alert('Please enter a valid username');
        return;
    }
    // checks that password is greater than 6 characters
    if (password.trim().length < 6) {
        alert('Please enter a valid password. Password must be 6 characters long.');
        return;
    }
    // checks that repeat password is the same as password
    if (repeatPassword !== password) {
        alert('your passwords do not match');
        return;
    }

    // posts the user input to the /api/signup endpoint
    try {
        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            })
        });

        await response.json();
        // change user window to the /users endpoint
        window.location.href = '/todos';
    } catch (error) {
        alert(error);
    }
});
