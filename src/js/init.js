import render from "./view.js";

const init = () => {

  const state = {
    mode: 'business',
    warning: {
      status: 'active',
    },
    modal: {
      status: 'disabled',
    },
    form: {
      status: 'invalid',
      fields: {
        name: '',
        email: '',
        tel: '',
        company: '',
        website: '',
      },
    },
  };


  const headerTabs = Array.from(document.querySelectorAll('.header__nav-tab-link'));
  const warningButtons = Array.from(document.querySelector('.warning__buttons').children);
  const contactButtons = Array.from(document.querySelectorAll('.contact-button'));
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalButtonClose = document.querySelector('.modal__button-close');

  const modalForm = document.querySelector('.modal__form');
  const modalFormInputs = Array.from(modalForm.querySelectorAll('.form__input'));

  headerTabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      const currentTab = event.target;
      const newMode = Array.from(currentTab.classList)
        .filter((className) => className.includes('business') || className.includes('customers'))
        .reduce((acc, className) => {
          if (className === 'header__nav-tab-customers') {
            return `${acc}${'customers'}`;
          } else {
            return `${acc}${'business'}`;
          }
        }, '');

      state.mode = newMode;
      render(state)
    })

  });

  warningButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.warning.status = 'disabled';
      render(state);
    })
  });

  contactButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.modal.status = 'active';
      render(state);
    })
  })


  modalFormInputs.forEach((input) => {

    input.addEventListener('input', (event) => {
      const currentInput = event.target;
      const currentInputId = currentInput.id;
      const currentInputIsValid = currentInput.validity.valid;
      
      console.log(currentInput.validity.valid)
      if (currentInputIsValid) {
        state.form.fields[currentInputId] = 'valid';
      } else {
        state.form.fields[currentInputId] = 'error-invalid';
      }

      const formFields = state.form.fields;
      const requiredFieldsIds = Object.keys(formFields).filter((id) => document.querySelector(`#${id}`).required);
      const formIsValid = requiredFieldsIds.filter((id) => formFields[id] === 'valid').length > 2 ? 'valid' : 'invalid';

      state.form.status = formIsValid;
      console.log(state.form.fields)
      render(state);
    })

    input.addEventListener('blur', (event) => {
      const currentInput = event.target;
      const currentInputId = currentInput.id;

      const currentInputIsEmpty = currentInput.value === '';
      const currentInputIsRequired = currentInput.required;

      const formFields = state.form.fields;
      const requiredFieldsIds = Object.keys(formFields).filter((id) => document.querySelector(`#${id}`).required);
      const formIsValid = requiredFieldsIds.filter((id) => formFields[id] === 'valid').length > 2 ? 'valid' : 'invalid';


      if (currentInputIsRequired && currentInputIsEmpty) {
        state.form.fields[currentInputId] = 'error-required';
      } 

      state.form.status = formIsValid;
      render(state);
    });
  });

  modalButtonClose.addEventListener('click', () => {
    const formFields = state.form.fields
    const formFieldsIds = Object.keys(formFields);

    formFieldsIds.forEach((id) => {
      state.form.fields[id] = '';
    })
    state.modal.status = 'disabled';

    render(state)
  });

};

export default init;