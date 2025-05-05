$(document).ready(function() {

    const registrationForm = document.getElementById('registration-form');

    if (registrationForm) {
        
        const formElements = registrationForm.querySelectorAll('input, select, textarea, button');
        formElements.forEach((element, index) => {
            element.setAttribute('tabindex', index + 1);
        });

   
        const validators = {
        
            required: function(value) {
                return value.trim() !== '';
            },
            
         
            email: function(value) {
               
                if (value.trim() === '') return true; 
                
                const atIndex = value.indexOf('@');
                const dotIndex = value.lastIndexOf('.');
                
                return atIndex > 0 && dotIndex > atIndex && dotIndex < value.length - 1;
            },
            
          
            phone: function(value) {
                if (value.trim() === '') return true; 
                
                const phoneRegex = /^\d{3}-\d{7}$/;
                return phoneRegex.test(value);
            },

        
            passwordMatch: function(value, compareValue) {
                return value === compareValue;
            },
            
        
            checkboxGroup: function(name) {
                const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${name}"]`);
                return Array.from(checkboxes).some(checkbox => checkbox.checked);
            },
            
          
            radioGroup: function(name) {
                return !!document.querySelector(`input[type="radio"][name="${name}"]:checked`);
            },
            
            
            selectRequired: function(value) {
                return value !== '' && value !== 'default';
            }
        };

     
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            input.classList.add('invalid');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('visible');
            }
        }

       
        function clearError(input) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            input.classList.remove('invalid');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('visible');
            }
        }

       
        function clearAllErrors() {
            const errorElements = registrationForm.querySelectorAll('.error-message');
            const invalidInputs = registrationForm.querySelectorAll('.invalid');
            
            errorElements.forEach(element => {
                element.textContent = '';
                element.classList.remove('visible');
            });
            
            invalidInputs.forEach(input => {
                input.classList.remove('invalid');
            });
        }

     
        function validateInput(input, validationType, ...args) {
            const value = input.value;
            let isValid = true;
            
            if (validationType === 'required' && !validators.required(value)) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (validationType === 'email' && !validators.email(value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            } else if (validationType === 'phone' && !validators.phone(value)) {
                showError(input, 'Please enter a valid phone number (XXX-XXXXXXX)');
                isValid = false;
            } else if (validationType === 'passwordMatch' && !validators.passwordMatch(value, args[0])) {
                showError(input, 'Passwords do not match');
                isValid = false;
            } else if (validationType === 'selectRequired' && !validators.selectRequired(value)) {
                showError(input, 'Please select an option');
                isValid = false;
            }
            
            if (isValid) {
                clearError(input);
            }
            
            return isValid;
        }

    
        registrationForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.type === 'text' || this.type === 'textarea' || this.tagName === 'SELECT') {
                    validateInput(this, 'required');
                } else if (this.type === 'email') {
                    validateInput(this, 'required') && validateInput(this, 'email');
                } else if (this.type === 'tel') {
                    validateInput(this, 'required') && validateInput(this, 'phone');
                } else if (this.type === 'password' && this.id === 'confirm-password') {
                    const passwordInput = document.getElementById('password');
                    validateInput(this, 'passwordMatch', passwordInput.value);
                } else if (this.tagName === 'SELECT') {
                    validateInput(this, 'selectRequired');
                }
            });
        });

        const fileUpload = document.getElementById('file-upload');
        const fileList = document.getElementById('file-list');
        const fileInput = document.getElementById('file-input');
        
        if (fileUpload && fileList && fileInput) {
       
            const uploadedFiles = [];
            
           
            function addFileToList(file) {
                const fileExtension = file.name.split('.').pop().toLowerCase();
                const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
                
               
                if (!allowedExtensions.includes(fileExtension)) {
                    showNotification('File type not allowed. Please upload PDF, DOC, or image files.', 'error');
                    return;
                }
                
             
                if (uploadedFiles.some(f => f.name === file.name)) {
                    showNotification('File already added.', 'warning');
                    return;
                }
                
            
                uploadedFiles.push(file);
                
          
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
               
                let iconClass = 'fa-file';
                if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                    iconClass = 'fa-file-image';
                } else if (fileExtension === 'pdf') {
                    iconClass = 'fa-file-pdf';
                } else if (['doc', 'docx'].includes(fileExtension)) {
                    iconClass = 'fa-file-word';
                }
                
                fileItem.innerHTML = `
                    <div class="file-name">
                        <i class="fas ${iconClass} file-icon"></i>
                        ${file.name}
                    </div>
                    <span class="file-remove" data-name="${file.name}">
                        <i class="fas fa-times"></i>
                    </span>
                `;
                
                fileList.appendChild(fileItem);
                
         
                fileItem.querySelector('.file-remove').addEventListener('click', function() {
                    const fileName = this.getAttribute('data-name');
                    const fileIndex = uploadedFiles.findIndex(f => f.name === fileName);
                    
                    if (fileIndex !== -1) {
                        uploadedFiles.splice(fileIndex, 1);
                        fileItem.remove();
                    }
                });
            }
            
       
            fileInput.addEventListener('change', function() {
                const files = this.files;
                if (files.length > 0) {
                    Array.from(files).forEach(file => addFileToList(file));
                }
                this.value = ''; 
            });
            
        
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                fileUpload.addEventListener(eventName, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
            
            fileUpload.addEventListener('dragenter', function() {
                this.classList.add('dragover');
            });
            
            fileUpload.addEventListener('dragover', function() {
                this.classList.add('dragover');
            });
            
            fileUpload.addEventListener('dragleave', function() {
                this.classList.remove('dragover');
            });
            
            fileUpload.addEventListener('drop', function(e) {
                this.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    Array.from(files).forEach(file => addFileToList(file));
                }
            });
            
     
            fileUpload.addEventListener('click', function() {
                fileInput.click();
            });
        }

  
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            clearAllErrors();
            
            
            const requiredInputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            requiredInputs.forEach(input => {
                if (input.type === 'email') {
                    isValid = validateInput(input, 'required') && validateInput(input, 'email') && isValid;
                } else if (input.type === 'tel') {
                    isValid = validateInput(input, 'required') && validateInput(input, 'phone') && isValid;
                } else if (input.type === 'password' && input.id === 'confirm-password') {
                    const passwordInput = document.getElementById('password');
                    isValid = validateInput(input, 'passwordMatch', passwordInput.value) && isValid;
                } else if (input.tagName === 'SELECT') {
                    isValid = validateInput(input, 'selectRequired') && isValid;
                } else {
                    isValid = validateInput(input, 'required') && isValid;
                }
            });
            
 
            const genderSelected = validators.radioGroup('gender');
            if (!genderSelected) {
                const radioGroup = this.querySelector('.radio-group');
                const formGroup = radioGroup.closest('.form-group');
                const errorElement = formGroup.querySelector('.error-message');
                
                errorElement.textContent = 'Please select a gender';
                errorElement.classList.add('visible');
                isValid = false;
            }
            
 
            const servicesSelected = validators.checkboxGroup('services');
            if (!servicesSelected) {
                const checkboxGroup = this.querySelector('.checkbox-group');
                const formGroup = checkboxGroup.closest('.form-group');
                const errorElement = formGroup.querySelector('.error-message');
                
                errorElement.textContent = 'Please select at least one service';
                errorElement.classList.add('visible');
                isValid = false;
            }
    
            if (isValid) {
                
                const formData = new FormData(this);
                let formDataOutput = '';
                
                for (const [key, value] of formData.entries()) {
                   
                    if (key !== 'password' && key !== 'confirm-password') {
                        formDataOutput += `<p><strong>${key}:</strong> ${value}</p>`;
                    }
                }
                
           
                const servicesChecked = Array.from(this.querySelectorAll('input[name="services"]:checked'))
                    .map(checkbox => checkbox.value);
                
                if (servicesChecked.length > 0) {
                    formDataOutput += `<p><strong>Selected Services:</strong> ${servicesChecked.join(', ')}</p>`;
                }
                
                
                if (uploadedFiles && uploadedFiles.length > 0) {
                    formDataOutput += '<p><strong>Uploaded Files:</strong></p><ul>';
                    uploadedFiles.forEach(file => {
                        formDataOutput += `<li>${file.name} (${(file.size / 1024).toFixed(2)} KB)</li>`;
                    });
                    formDataOutput += '</ul>';
                }
                
           
                const outputContainer = document.getElementById('form-output');
                if (outputContainer) {
                    outputContainer.innerHTML = `
                        <div class="success-message">
                            <h3>Registration Successful!</h3>
                            <p>Thank you for registering with Bright Smile Dental Clinic.</p>
                            <div class="form-data">
                                ${formDataOutput}
                            </div>
                        </div>
                    `;
                    
                    
                    outputContainer.scrollIntoView({ behavior: 'smooth' });
                }
                
           
                showNotification('Registration successful!', 'success');
            } else {
               
                showNotification('Please correct the errors in the form.', 'error');
            }
        });


        const resetButton = registrationForm.querySelector('button[type="reset"]');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                
                clearAllErrors();
                
         
                if (fileList) {
                    fileList.innerHTML = '';
                    uploadedFiles.length = 0;
                }
                
              
                const outputContainer = document.getElementById('form-output');
                if (outputContainer) {
                    outputContainer.innerHTML = '';
                }
                
              
                showNotification('Form has been reset.', 'info');
            });
        }
    }


    function showNotification(message, type = 'info') {
        const notification = $(`<div class="notification ${type}">${message}</div>`);
        $('body').append(notification);
        

        setTimeout(function() {
            notification.addClass('show');
        }, 10);
        
   
        setTimeout(function() {
            notification.removeClass('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 5000);
    }
});