const validateRegisterForm = (values) => {
  const { name, email, password, role } = values; // Destructure values object
  let errors = {};

  if (!name.trim()) {
    errors.name = "Name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{9,})/.test(password)
  ) {
    errors.password = "Create a Strong Password";
  }

  if (!role) {
    errors.role = "Category is required";
  }

  return errors;
};

export default validateRegisterForm;
