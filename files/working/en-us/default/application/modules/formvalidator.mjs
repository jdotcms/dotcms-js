class FormValidator {
    constructor() {
        this.errors = {};
    }

    // Add an error message for a specific field
    addError(field, message) {
        this.errors[field] = message;
    }

    // Check if a field is empty
    isNotEmpty(field, value) {
        if (value.trim() === '') {
            this.addError(field, 'Field cannot be empty');
            return false;
        }
        return true;
    }

    // Check if a field is a valid email address
    isValidEmail(field, email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            this.addError(field, 'Invalid email address');
            return false;
        }
        return true;
    }

    // Check if two fields have the same value (e.g., password confirmation)
    isSame(field1, value1, field2, value2) {
        if (value1 !== value2) {
            this.addError(field2, `${field1} and ${field2} must match`);
            return false;
        }
        return true;
    }

    // Check if there are any validation errors
    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }

    // Get error messages
    getErrors() {
        return this.errors;
    }

    // Clear all errors
    clearErrors() {
        this.errors = {};
    }
}

// Example usage:
/*const validator = new FormValidator();
validator.isNotEmpty('username', 'John Doe');
validator.isValidEmail('email', 'johndoe@example.com');
validator.isSame('password', 'password123', 'confirmPassword', 'password123');

if (validator.hasErrors()) {
    console.log('Validation failed:');
    console.log(validator.getErrors());
} else {
    console.log('Validation passed!');
}*/
