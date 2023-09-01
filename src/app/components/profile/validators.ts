function validateName(nameType: string, name: string): string {
  const minLength = 2;
  const maxLength = 50;

  if (!name) {
    if (nameType === 'first') return 'First name is required.';
    return 'Last name is required.';
  }

  if (name.length < minLength || name.length > maxLength) {
    if (nameType === 'first') return `First name should be between ${minLength} and ${maxLength} characters.`;
    return `Last name should be between ${minLength} and ${maxLength} characters.`;
  }

  return '';
}

function validateEmail(email: string): string {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    return 'Email address is required.';
  }

  if (!emailPattern.test(email)) {
    return 'Invalid email address format.';
  }

  return '';
}

function validateDateOfBirth(dateOfBirth: string): string {
  const currentDate = new Date();
  const minimumAge = 13;

  const dob = new Date(dateOfBirth);

  if (!dateOfBirth) {
    return 'Date of birth is required.';
  }

  if (isNaN(dob.getTime())) {
    return 'Invalid date of birth format.';
  }

  const age =
    currentDate.getFullYear() -
    dob.getFullYear() -
    (currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
      ? 1
      : 0);

  if (age < minimumAge) {
    return `You must be at least ${minimumAge} years old.`;
  }

  return '';
}

function validatePassword(pass: string): string {
  let errorMsg = '';
  if (pass.length === 0) errorMsg = "Can't be empty";
  else {
    if (pass.length < 8) errorMsg += 'At least 8 characters. ';
    if (!/[A-Z]/.test(pass)) errorMsg += ' At least 1 uppercase letter. ';
    if (!/[a-z]/.test(pass)) errorMsg += ' At least 1 lowercase letter. ';
    if (!/[0-9]/.test(pass)) errorMsg += ' At least 1 digit. ';
    if (/[^A-Za-z0-9]/.test(pass)) errorMsg += ' No special characters. ';
    if (/\s/.test(pass)) errorMsg += ' No spaces. ';
  }

  return errorMsg;
}

export { validateDateOfBirth, validateEmail, validateName, validatePassword };
