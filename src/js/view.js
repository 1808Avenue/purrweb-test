const renderFormValidation = (state) => {
  const formStatus = state.form.status;
  const inputIds = Object.keys(state.form.fields);

  const getErrorText = (id) => {
    switch (id) {
      case 'email': {
        return 'Invalid email.';
      }
      case 'tel': {
        return 'Invalid phone number.';
      }
      default: {
        return 'Error'
      }
    }
  };
  const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

  const getPhoneNumberMask = (input) => {
    const inputValue = input.value;
    const callingCodes = ['7', '8', '9'];

    let inputNumbersValue = getInputNumbersValue(input);
    let formattedInputValue = '';

    if (!inputNumbersValue) {
      return input.value = '';
    }

    if (callingCodes.includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] === '9') {
        inputNumbersValue = '7' + inputNumbersValue;
        console.log(inputNumbersValue)
      }
      let firstSymbols = (inputNumbersValue[0] === '8' || inputValue[0] === '+') ? '+7' : '+7';
      formattedInputValue = firstSymbols + ' ';

      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
      if (inputValue === '+7') {
        formattedInputValue = '';
      }
    }
    return formattedInputValue;
  };

  const modalForm = document.querySelector('.modal__form');
  const formSubmitButton = document.querySelector('.contact-button[type=submit]');
  const formFieldWebsite = document.querySelector('.form__field-website');
  const inputTel = document.querySelector('.form__input[type=tel]');

  if (formStatus === 'invalid') {
    formSubmitButton.setAttribute('disabled', 'true')
  } else {
    formSubmitButton.removeAttribute('disabled');
  }

  inputIds.forEach((inputId) => {
    const input = document.querySelector(`#${inputId}`);
    const formFields = state.form.fields;
    const inputStatus = formFields[inputId];
    const requiredErrors = Object.keys(formFields).filter((id) => formFields[id] === 'error-required');

    if (inputStatus === 'error-invalid') {
      input.parentElement.setAttribute('error-invalid', getErrorText(inputId));
      input.classList.add('form__input--invalid');
    } else if (inputStatus === 'error-required') {
      input.parentElement.removeAttribute('error-invalid');
      input.parentElement.setAttribute('error-required', 'This field is required.');
      input.classList.add('form__input--invalid');
    } else {
      input.parentElement.removeAttribute('error-required');
      input.parentElement.removeAttribute('error-invalid');
      input.classList.remove('form__input--invalid');
    }

    if (requiredErrors.length > 1) {
      formFieldWebsite.setAttribute('error-all-required', 'Please fill in all required fields');
    } else {
      formFieldWebsite.removeAttribute('error-all-required');
    }
  })

  inputTel.value = getPhoneNumberMask(inputTel);
};


const render = (state) => {
  const currentMode = state.mode;
  const currentWarningStatus = state.warning.status;
  const currentModalStatus = state.modal.status;

  // Warning
  const warning = document.querySelector('.warning');
  const classNameWarningActive = 'warning--active';
  const classNameWarningDisabled = 'warning--disabled';

  // Header tabs
  const headerTabBusiness = document.querySelector('.header__nav-tab-business');
  const headerTabCustomers = document.querySelector('.header__nav-tab-customers');
  const classNameHeaderTabActive = 'header__nav-tab-link--active';

  // Sticky logo
  const stickyLogoBusiness = document.querySelector('.sticky__logo-business');
  const stickyLogoCustomers = document.querySelector('.sticky__logo-customers');
  const classNameStickyLogoActive = 'sticky__logo-inner--active';
  const classNameStickyLogoDisabled = 'sticky__logo-inner--disabled';

  // Modal
  const modal = document.querySelector('.modal');
  const modalForm = document.querySelector('.modal__form');
  const classNameModalActive = 'modal--active';
  const classNameModalDisabled = 'modal--disabled';

  // Modal overlay
  const modalOverlay = document.querySelector('.modal-overlay');
  const classNameModalOverlayActive = 'modal-overlay--active';
  const classNameModalOverlayDisabled = 'modal-overlay--disabled';


  if (currentMode === 'business') {
    headerTabCustomers.classList.remove(classNameHeaderTabActive);
    headerTabBusiness.classList.add(classNameHeaderTabActive);

    stickyLogoCustomers.classList.remove(classNameStickyLogoActive);
    stickyLogoCustomers.classList.add(classNameStickyLogoDisabled);

    stickyLogoBusiness.classList.remove(classNameStickyLogoDisabled)
    stickyLogoBusiness.classList.add(classNameStickyLogoActive)
  }

  if (currentMode === 'customers') {
    headerTabBusiness.classList.remove(classNameHeaderTabActive);
    headerTabCustomers.classList.add(classNameHeaderTabActive);

    stickyLogoBusiness.classList.remove(classNameStickyLogoActive)
    stickyLogoBusiness.classList.add(classNameStickyLogoDisabled)

    stickyLogoCustomers.classList.remove(classNameStickyLogoDisabled);
    stickyLogoCustomers.classList.add(classNameStickyLogoActive);
  }

  if (currentWarningStatus === 'disabled') {
    warning.classList.remove(classNameWarningActive);
    warning.classList.add(classNameWarningDisabled);
  }

  if (currentModalStatus === 'active') {
    modal.classList.remove(classNameModalDisabled);
    modal.classList.add(classNameModalActive);

    modalOverlay.classList.remove(classNameModalOverlayDisabled);
    modalOverlay.classList.add(classNameModalOverlayActive);
  }

  if (currentModalStatus === 'disabled') {
    modalForm.reset();
    modal.classList.remove(classNameModalActive);
    modal.classList.add(classNameModalDisabled);

    modalOverlay.classList.remove(classNameModalOverlayActive);
    modalOverlay.classList.add(classNameModalOverlayDisabled);
  }

  renderFormValidation(state);
};


export default render;
