 document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
            
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mainMenu.classList.toggle('active');
            });
            
            const dropdownParents = document.querySelectorAll('.has-dropdown > a');
            
            dropdownParents.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        const parent = this.parentElement;
                        parent.classList.toggle('active');
                    }
                });
            });
        });