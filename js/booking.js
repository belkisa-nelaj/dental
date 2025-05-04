document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStepId = this.dataset.next;
            
            if (validateStep(currentStep)) {
                currentStep.classList.remove('active');
                document.getElementById(nextStepId).classList.add('active');
                scrollToTop();
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStepId = this.dataset.prev;
            
            currentStep.classList.remove('active');
            document.getElementById(prevStepId).classList.add('active');
            scrollToTop();
        });
    });
    
    // Form validation
    function validateStep(step) {
        let isValid = true;
        const requiredInputs = step.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            const errorElement = document.getElementById(`${input.id}Error`);
            
            if (!input.value) {
                input.classList.add('invalid');
                errorElement.textContent = 'This field is required';
                errorElement.classList.add('visible');
                isValid = false;
            } else {
                input.classList.remove('invalid');
                errorElement.classList.remove('visible');
                

                if (input.id === 'email' && !validateEmail(input.value)) {
                    input.classList.add('invalid');
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.classList.add('visible');
                    isValid = false;
                }
                
                if (input.id === 'phone' && !validatePhone(input.value)) {
                    input.classList.add('invalid');
                    errorElement.textContent = 'Please enter a valid phone number';
                    errorElement.classList.add('visible');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\-\(\)]{10,}$/;
        return re.test(phone);
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: document.querySelector('.booking-form').offsetTop - 20,
            behavior: 'smooth'
        });
    }
    

    const bookingForm = document.getElementById('bookingForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeModal = document.getElementById('closeModal');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(document.getElementById('step3'))) {

            const formData = new FormData(bookingForm);
            const email = formData.get('email');
            
            document.getElementById('confirmEmail').textContent = email;
            confirmationModal.style.display = 'flex';
            
            bookingForm.reset();
            steps.forEach(step => step.classList.remove('active'));
            document.getElementById('step1').classList.add('active');
        }
    });
    

    closeModal.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });
    
    document.querySelector('.close-modal').addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
});