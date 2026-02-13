// Validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === "") {
    return { valid: false, message: "Email is required" };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }
  return { valid: true };
};

export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return { valid: false, message: "Password is required" };
  }
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  return { valid: true };
};

export const validateName = (name) => {
  if (!name || name.trim() === "") {
    return { valid: false, message: "Name is required" };
  }
  if (name.trim().length < 2) {
    return { valid: false, message: "Name must be at least 2 characters" };
  }
  return { valid: true };
};

export const validateTripName = (tripName) => {
  if (!tripName || tripName.trim() === "") {
    return { valid: false, message: "Trip name is required" };
  }
  if (tripName.trim().length < 3) {
    return { valid: false, message: "Trip name must be at least 3 characters" };
  }
  return { valid: true };
};

export const validateDate = (date) => {
  if (!date || date.trim() === "") {
    return { valid: false, message: "Date is required" };
  }
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { valid: false, message: "Please enter a valid date" };
  }
  return { valid: true };
};

export const validateAmount = (amount) => {
  if (!amount || amount === "") {
    return { valid: false, message: "Amount is required" };
  }
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) {
    return { valid: false, message: "Please enter a valid amount greater than 0" };
  }
  return { valid: true };
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === "") {
    return { valid: false, message: "Phone number is required" };
  }
  const phoneRegex = /^[0-9]{10}$/;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length !== 10) {
    return { valid: false, message: "Phone number must be 10 digits" };
  }
  return { valid: true };
};

export const validateDateRange = (startDate, endDate) => {
  const start = validateDate(startDate);
  const end = validateDate(endDate);
  
  if (!start.valid) return start;
  if (!end.valid) return end;
  
  const startObj = new Date(startDate);
  const endObj = new Date(endDate);
  
  if (endObj < startObj) {
    return { valid: false, message: "End date must be after start date" };
  }
  
  return { valid: true };
};
