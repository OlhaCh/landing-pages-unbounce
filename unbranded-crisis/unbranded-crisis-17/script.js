function handleSubmit(event) {
  event.preventDefault();
  window.location.href = 'tel:8447227147';
}

document.addEventListener('DOMContentLoaded', function () {
  const insuranceForm = document.querySelector('form[data-form-target="insurance-form"]');

  document.getElementById('policy_id_number').addEventListener('keydown', function(event) {
    restrictToNumbers(event);
  });

  document.getElementById('group_number').addEventListener('keydown', function(event) {
    restrictToNumbers(event);
  });

  insuranceForm.addEventListener('submit', function(event) {
      event.preventDefault();

      let isValid = true;

      const fields = [
          { id: 'name', message: 'Please enter your full name.' },
          { id: 'phone', message: 'Please enter a valid phone number.', minLength: 10, maxLength: 15 },
          { id: 'email', message: 'Please enter a valid email address.', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
          { id: 'insurance_company', message: 'Please enter your insurance company.' },
          { id: 'policy_id_number', message: 'Please enter a valid 10-digit policy ID number.', maxLength: 10 },
          { id: 'group_number', message: 'Please enter a valid 5-digit group number.', maxLength: 5 },
          { id: 'date_of_birth', message: 'Please enter your date of birth.' }
      ];

      fields.forEach(function(field) {
          const input = document.getElementById(field.id);
          const value = input.value.trim();
          const parent = input.parentElement;

          parent.classList.remove('invalid');
          let errorMessage = parent.querySelector('.error-message');
          if (!errorMessage) {
              errorMessage = document.createElement('span');
              errorMessage.className = 'error-message';
              parent.appendChild(errorMessage);
          }

          if (value === '') {
              parent.classList.add('invalid');
              errorMessage.textContent = field.message;
              isValid = false;
          }

          if (field.minLength && value.length < field.minLength) {
              parent.classList.add('invalid');
              errorMessage.textContent = field.message;
              isValid = false;
          }

          if (field.maxLength && value.length > field.maxLength) {
              parent.classList.add('invalid');
              errorMessage.textContent = field.message;
              isValid = false;
          }

          if (field.pattern && !field.pattern.test(value)) {
              parent.classList.add('invalid');
              errorMessage.textContent = field.message;
              isValid = false;
          }

          input.addEventListener('focus', function() {
              parent.classList.remove('invalid');
              errorMessage.textContent = '';
          });
      });

      if (isValid) {
          insuranceForm.submit();
      }
  });

  function restrictToNumbers(event) {
      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
      if (
          !allowedKeys.includes(event.key) &&
          !/^[0-9]$/.test(event.key)
      ) {
          event.preventDefault();
      }
  }

  document.getElementById('policy_id_number').addEventListener('input', function(event) {
      enforceMaxLength(event, 10);
  });

  document.getElementById('group_number').addEventListener('input', function(event) {
      enforceMaxLength(event, 5);
  });

  function enforceMaxLength(event, maxLength) {
      const input = event.target;
      if (input.value.length > maxLength) {
          input.value = input.value.slice(0, maxLength);
      }
  }
});