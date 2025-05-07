document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links (optional)
    document.querySelectorAll('.main-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
});