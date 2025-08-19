// ValidationUtils implementation (this would typically be in src/utils/ValidationUtils.js)
const ValidationUtils = {
  isValidEmail: (email) => {
    if (!email) return false;
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isValidPassword: (password) => {
    if (!password) return false;
    
    // Password must be at least 8 characters long and contain at least:
    // - One uppercase letter
    // - One lowercase letter
    // - One number
    // - One special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },
  
  isValidPhone: (phone) => {
    if (!phone) return false;
    
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if the cleaned phone number has 10 digits (US format)
    return cleanPhone.length === 10;
  },
  
  isValidName: (name) => {
    if (!name) return false;
    
    // Name must be at least 2 characters long and contain only letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    return nameRegex.test(name);
  },
  
  isNotEmpty: (value) => {
    if (value === null || value === undefined) return false;
    
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    
    if (typeof value === 'object') {
      return Object.keys(value).length > 0;
    }
    
    return true;
  }
};

describe('ValidationUtils', () => {
  describe('isValidEmail', () => {
    it('returns true for valid emails', () => {
      expect(ValidationUtils.isValidEmail('test@example.com')).toBe(true);
      expect(ValidationUtils.isValidEmail('user.name@domain.co')).toBe(true);
      expect(ValidationUtils.isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('returns false for invalid emails', () => {
      expect(ValidationUtils.isValidEmail('test@')).toBe(false);
      expect(ValidationUtils.isValidEmail('test@domain')).toBe(false);
      expect(ValidationUtils.isValidEmail('test.domain.com')).toBe(false);
      expect(ValidationUtils.isValidEmail('test@domain.')).toBe(false);
      expect(ValidationUtils.isValidEmail('test@.com')).toBe(false);
      expect(ValidationUtils.isValidEmail('')).toBe(false);
      expect(ValidationUtils.isValidEmail(null)).toBe(false);
      expect(ValidationUtils.isValidEmail(undefined)).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('returns true for valid passwords', () => {
      expect(ValidationUtils.isValidPassword('Password1!')).toBe(true);
      expect(ValidationUtils.isValidPassword('Str0ng@Password')).toBe(true);
      expect(ValidationUtils.isValidPassword('C0mpl3x$Pass')).toBe(true);
    });

    it('returns false for invalid passwords', () => {
      expect(ValidationUtils.isValidPassword('password')).toBe(false); // No uppercase, number, or special char
      expect(ValidationUtils.isValidPassword('Password')).toBe(false); // No number or special char
      expect(ValidationUtils.isValidPassword('Password1')).toBe(false); // No special char
      expect(ValidationUtils.isValidPassword('Pass@1')).toBe(false); // Too short
      expect(ValidationUtils.isValidPassword('')).toBe(false);
      expect(ValidationUtils.isValidPassword(null)).toBe(false);
      expect(ValidationUtils.isValidPassword(undefined)).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('returns true for valid phone numbers', () => {
      expect(ValidationUtils.isValidPhone('1234567890')).toBe(true);
      expect(ValidationUtils.isValidPhone('(123) 456-7890')).toBe(true);
      expect(ValidationUtils.isValidPhone('123-456-7890')).toBe(true);
      expect(ValidationUtils.isValidPhone('123.456.7890')).toBe(true);
    });

    it('returns false for invalid phone numbers', () => {
      expect(ValidationUtils.isValidPhone('123456')).toBe(false); // Too short
      expect(ValidationUtils.isValidPhone('12345678901')).toBe(false); // Too long
      expect(ValidationUtils.isValidPhone('')).toBe(false);
      expect(ValidationUtils.isValidPhone(null)).toBe(false);
      expect(ValidationUtils.isValidPhone(undefined)).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('returns true for valid names', () => {
      expect(ValidationUtils.isValidName('John')).toBe(true);
      expect(ValidationUtils.isValidName('Mary Jane')).toBe(true);
      expect(ValidationUtils.isValidName("O'Connor")).toBe(true);
      expect(ValidationUtils.isValidName('Smith-Johnson')).toBe(true);
    });

    it('returns false for invalid names', () => {
      expect(ValidationUtils.isValidName('J')).toBe(false); // Too short
      expect(ValidationUtils.isValidName('John123')).toBe(false); // Contains numbers
      expect(ValidationUtils.isValidName('John!')).toBe(false); // Contains invalid special char
      expect(ValidationUtils.isValidName('')).toBe(false);
      expect(ValidationUtils.isValidName(null)).toBe(false);
      expect(ValidationUtils.isValidName(undefined)).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('returns true for non-empty values', () => {
      expect(ValidationUtils.isNotEmpty('test')).toBe(true);
      expect(ValidationUtils.isNotEmpty(' test ')).toBe(true);
      expect(ValidationUtils.isNotEmpty([1, 2, 3])).toBe(true);
      expect(ValidationUtils.isNotEmpty({ key: 'value' })).toBe(true);
      expect(ValidationUtils.isNotEmpty(123)).toBe(true);
      expect(ValidationUtils.isNotEmpty(true)).toBe(true);
      expect(ValidationUtils.isNotEmpty(false)).toBe(true);
    });

    it('returns false for empty values', () => {
      expect(ValidationUtils.isNotEmpty('')).toBe(false);
      expect(ValidationUtils.isNotEmpty('   ')).toBe(false);
      expect(ValidationUtils.isNotEmpty([])).toBe(false);
      expect(ValidationUtils.isNotEmpty({})).toBe(false);
      expect(ValidationUtils.isNotEmpty(null)).toBe(false);
      expect(ValidationUtils.isNotEmpty(undefined)).toBe(false);
    });
  });
});
