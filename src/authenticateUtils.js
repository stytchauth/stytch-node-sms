function isValidPasscodeDigit(digitValue) {
  const regex = /^[0-9]$/g;
  if (digitValue.match(regex)) {
    return true;
  }
  return false;
}

function isValidPasscode() {
  const passcodeInputs = document.getElementsByClassName('passcodeInput');
  const regex = /^[0-9]$/g;
  for (i = 0; i < passcodeInputs.length; i++) {
    if (!isValidPasscodeDigit(passcodeInputs[i].value)) {
      return false;
    }
  }
  return true;
}

// Handles auto tabbing to next passcode digit input.
// Logic from https://stackoverflow.com/questions/15595652/focus-next-input-once-reaching-maxlength-value.
function autoTab(target) {
  if (target.value.length >= target.maxLength) {
    var next = target;
    while (next = next.nextElementSibling) {
      if (next == null)
        break;
      if (next.tagName.toLowerCase() === "input") {
        next.focus();
        break;
      }
    }
  }
  // Move to previous field if empty (user pressed backspace)
  else if (target.value.length === 0) {
    var previous = target;
    while (previous = previous.previousElementSibling) {
      if (previous == null)
        break;
      if (previous.tagName.toLowerCase() === "input") {
        previous.focus();
        break;
      }
    }
  }
}

function onPasscodeDigitEnter(e) {
  document.getElementById('errorText').style.visibility = 'hidden';
  if (isValidPasscodeDigit(e.target.value) || e.target.value === '') {
    autoTab(e.target);
  }

  // Update styling once passcode is valid.
  const inputs = document.getElementsByTagName('input');
  const button = document.getElementById('button')
  if (!isValidPasscode()) {
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

function handleError() {
  const passcodeInputs = document.getElementsByClassName('passcodeInput');
  for (i = 0; i < passcodeInputs.length; i++) {
    passcodeInputs[i].value = '';
    passcodeInputs[i].style.borderColor = 'red';
    button.disabled = true;
  }
}

