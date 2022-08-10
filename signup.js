const signupBtn = document.getElementById('signupBtn');
const email = document.getElementById('signupEmailInput');
const password = document.getElementById('signuppasswordInput');
const repeatpassword = document.getElementById('signuprepeatpassword');
const Username = document.getElementById('signupUsername');

signupBtn.addEventListener('click', async (event) => {
  event.preventDefault();
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
  // checks that repeatpassword=password 
  if (repeatpassword !== password) {
    alert('your password does not equal your previous password');
    return;
  }
});
//functional email
function EmailValidation(enteredEmail) {
  var mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

  if (enteredEmail.value.match(enteredEmail)) {
    document.form1.text1.focus();
    return true;
  }
  Else
  {
    alert('sorry your email was invalid');
    document.form1.text1.focus();
    return false;
  }
}
