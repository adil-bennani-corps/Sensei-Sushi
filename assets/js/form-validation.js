/**
 * Form Validation - Sensei Sushi
 * ==============================
 */

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });
  });
});

function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  if (isValid) {
    // Show success message
    showSuccessMessage(form);
    // Here you would normally send the form data
    // form.submit();
  } else {
    // Focus first error
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.focus();
    }
  }
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const required = field.hasAttribute('required');
  let isValid = true;
  let errorMessage = '';
  
  // Remove previous error
  field.classList.remove('error');
  removeErrorMessage(field);
  
  // Required check
  if (required && !value) {
    isValid = false;
    errorMessage = 'Ce champ est obligatoire';
  }
  
  // Email validation
  if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Veuillez entrer une adresse email valide';
    }
  }
  
  // Phone validation
  if (type === 'tel' && value) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.length < 9) {
      isValid = false;
      errorMessage = 'Veuillez entrer un numéro de téléphone valide';
    }
  }
  
  // Show error
  if (!isValid) {
    field.classList.add('error');
    showErrorMessage(field, errorMessage);
  }
  
  return isValid;
}

function showErrorMessage(field, message) {
  const error = document.createElement('span');
  error.className = 'form__error';
  error.textContent = message;
  field.parentNode.appendChild(error);
}

function removeErrorMessage(field) {
  const error = field.parentNode.querySelector('.form__error');
  if (error) {
    error.remove();
  }
}

function showSuccessMessage(form) {
  const success = document.createElement('div');
  success.className = 'form__success';
  success.textContent = 'Merci ! Votre message a été envoyé avec succès.';
  form.insertBefore(success, form.firstChild);
  
  // Reset form
  form.reset();
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    success.remove();
  }, 5000);
}

