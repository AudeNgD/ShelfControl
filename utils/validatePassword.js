const validatePassword = () => {
  let isValid = true;
  if (password !== "" && confirmPassword !== "") {
    if (password !== confirmPassword) {
      isValid = false;
      setError("Passwords does not match");
    }
  }
  return isValid;
};

export { validatePassword };
