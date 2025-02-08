export function validateForm(formData) {
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!formData.email.match(/\S+@\S+\.\S+/)) {
    errors.email = "Email is invalid";
  }
  return errors;
}
