function handleSubmit(event) {
  event.preventDefault();
  window.location.href = 'tel:8447227147';
}

document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body');
  const insuranceModal = document.getElementById('modal-insurance-form');
  const openModalTriggers = document.querySelectorAll('[data-modal-target="modal-insurance-form"]');
  const closeModalButton = insuranceModal.querySelector('.popup-modal__close');

  function openModal() {
    insuranceModal.classList.add('visible');
    body.classList.add('no-scroll');
  }

  function closeModal() {
    insuranceModal.classList.remove('visible');
    body.classList.remove('no-scroll');
  }

  openModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (event) {
      handleInsurance(event);
    });
  });

  closeModalButton.addEventListener('click', function () {
    closeModal();
  });

  insuranceModal.addEventListener('click', function (event) {
    if (event.target === insuranceModal) {
      closeModal();
    }
  });

  document.getElementById('policy-number').addEventListener('keydown', function(event) {
    restrictToNumbers(event);
  });

  document.getElementById('group-number').addEventListener('keydown', function(event) {
    restrictToNumbers(event);
  });

  document.getElementById('policy-number').addEventListener('input', function(event) {
    enforceMaxLength(event, 10);
  });

  document.getElementById('group-number').addEventListener('input', function(event) {
    enforceMaxLength(event, 5);
  });

  document.getElementById('popup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    const fields = [
      { id: 'first-name', message: 'Please enter your first name.' },
      { id: 'last-name', message: 'Please enter your last name.' },
      { id: 'insurance-company', message: 'Insurance Company required. Please enter your insurance company.' },
      { id: 'policy-number', message: 'Enter a valid 10-digit policy number.', minLength: 10, maxLength: 10 },
      { id: 'dob', message: 'Please enter your date of birth in MM/DD/YY format.' },
      { id: 'group-number', message: 'Enter a valid 5-digit group number.', minLength: 5, maxLength: 5 },
      { id: 'phone', message: 'Please enter a valid phone number.', minLength: 14, maxLength: 14 },
      { id: 'email', message: 'Please enter a valid email address.', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    ];

    fields.forEach(function(field) {
      const input = document.getElementById(field.id);
      const value = input.value.trim();
      const parent = input.parentElement;

      parent.classList.remove('invalid');
      const errorMessage = parent.querySelector('.error-message');

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
      this.submit();
    }
  });

  function handleInsurance(event) {
    event.preventDefault();
    const modalId = event.target.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.classList.add('visible');
      document.body.classList.add('no-scroll');
    }
  }

  function restrictToNumbers(event) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (
      !allowedKeys.includes(event.key) &&
      !/^[0-9]$/.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  function enforceMaxLength(event, maxLength) {
    const input = event.target;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }
});
