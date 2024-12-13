/**
 * Validates an email address using a regular expression.
 * @param email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};
