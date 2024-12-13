const MIN_PASSWORD_LENGTH = 8;

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return undefined;
}

export function validatePassword(password: string) {
  if (!password) return "Password is required";
  if (password.length < MIN_PASSWORD_LENGTH) return "Password too short";
  return undefined;
}
