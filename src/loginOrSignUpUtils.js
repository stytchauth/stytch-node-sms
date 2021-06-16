function isValidNumber() {
  // Regex validates phone numbers in (xxx)xxx-xxxx, xxx-xxx-xxxx, xxxxxxxxxx, and xxx.xxx.xxxx format
  const regex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/g;
  const inputValue = document.getElementById(`phone-number`).value;
  if (inputValue.match(regex)) {
    return true;
  }
  return false;
}

function onPhoneNumberChange() {
  // Update styling once phone number is valid.
  const inputs = document.getElementsByTagName('input');
  const button = document.getElementById('button');
  if (!isValidNumber()) {
    for (i = 0; i < inputs.length; i++) {
      inputs[i].style.borderColor = '#ADBCC5';
      button.disabled = true;
    }
  } else {
    for (i = 0; i < inputs.length; i++) {
      inputs[i].style.borderColor = '#19303D';
      button.disabled = false;
    }
  }
}

document.getElementById('button').disabled = true;
