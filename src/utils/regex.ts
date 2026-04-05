export const passwordValidatorRegex = /^(?=\S+$)(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=(?:.*[0-9]){4,})(?=.*[\W_]).+$/;

export const usernameValidatorRegex = /^(?!.*\s{2,})(?!\s)(?!.*\s$)[a-zA-ZÀ-ÿ\s]+$/;