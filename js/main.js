
$(document).ready(function() {
    
    $('.menu-toggle').click(function() {
        $(this).toggleClass('active');
        $('.main-menu').toggleClass('active');
        
       
        $(this).find('.bar:nth-child(1)').toggleClass('rotate-45 translate-y-8');
        $(this).find('.bar:nth-child(2)').toggleClass('opacity-0');
        $(this).find('.bar:nth-child(3)').toggleClass('rotate-neg-45 translate-y-neg-8');
    });

    // Dropdown Toggle on Mobile
    if (window.innerWidth <= 768) {
        $('.has-dropdown > a').click(function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
        });
    }

    // Add animations to elements when they come into view
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-fadeIn');
            }
        });
    }

    // Run animation check on load and scroll
    animateOnScroll();
    $(window).on('scroll resize', animateOnScroll);

  
    $('a[href^="#"]').click(function(e) {
        const target = $($(this).attr('href'));
        
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });

    // Testimonial Slider 
    let currentSlide = 0;
    const $slides = $('.testimonial-item');
    const totalSlides = $slides.length;

    function showSlide(index) {
        $slides.hide();
        $slides.eq(index).fadeIn();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Initialize slider
    if ($slides.length > 0) {
        showSlide(0);
        
       
        setInterval(nextSlide, 5000);
        

        if (totalSlides > 1) {
            const $prevButton = $('<button class="slider-nav prev"><i class="fas fa-chevron-left"></i></button>');
            const $nextButton = $('<button class="slider-nav next"><i class="fas fa-chevron-right"></i></button>');
            
            $('.testimonial-slider').append($prevButton, $nextButton);
            
            $prevButton.click(prevSlide);
            $nextButton.click(nextSlide);
        }
    }

    // Weather Widget
    function loadWeatherWidget() {

        const weatherWidgetContainer = document.getElementById('weather-widget');
        
        if (weatherWidgetContainer) {
      
            const weatherData = {
                location: "Cityville",
                temperature: "72°F",
                condition: "Sunny",
                forecast: [
                    { day: "Mon", temp: "74°F", icon: "sun" },
                    { day: "Tue", temp: "70°F", icon: "cloud-sun" },
                    { day: "Wed", temp: "68°F", icon: "cloud" },
                    { day: "Thu", temp: "72°F", icon: "sun" },
                    { day: "Fri", temp: "75°F", icon: "sun" }
                ]
            };
            
            // Create weather widget HTML
            let weatherHTML = `
                <div class="weather-current">
                    <h3>${weatherData.location} Weather</h3>
                    <div class="weather-info">
                        <i class="fas fa-${weatherData.condition.toLowerCase() === 'sunny' ? 'sun' : 'cloud'}"></i>
                        <span class="temperature">${weatherData.temperature}</span>
                        <span class="condition">${weatherData.condition}</span>
                    </div>
                </div>
                <div class="weather-forecast">
            `;
            
   
            weatherData.forecast.forEach(day => {
                weatherHTML += `
                    <div class="forecast-day">
                        <div class="day">${day.day}</div>
                        <i class="fas fa-${day.icon}"></i>
                        <div class="temp">${day.temp}</div>
                    </div>
                `;
            });
            
            weatherHTML += `</div>`;
            
      
            weatherWidgetContainer.innerHTML = weatherHTML;
        }
    }

    // If weather widget exists on the page, load it
    if ($('#weather-widget').length) {
        loadWeatherWidget();
    }

    // Appointments Chart using Chart.js (if available)
    function loadAppointmentsChart() {
        const chartContainer = document.getElementById('appointments-chart');
        
        if (chartContainer && typeof Chart !== 'undefined') {
            // Sample data for demonstration
            const appointmentData = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [{
                    label: 'Available Slots',
                    data: [12, 8, 5, 7, 10],
                    backgroundColor: 'rgba(38, 198, 218, 0.5)',
                    borderColor: 'rgba(38, 198, 218, 1)',
                    borderWidth: 1
                }]
            };
            
            // Create chart
            const ctx = chartContainer.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: appointmentData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Available Appointments'
                            }
                        }
                    }
                }
            });
        }
    }

  
    if ($('#appointments-chart').length) {
        loadAppointmentsChart();
    }

    let autoUpdateTimer;

    function startAutoUpdateTimer() {
     
        autoUpdateTimer = setInterval(function() {
          
            if ($('#weather-widget').length) {
                loadWeatherWidget();
            }
            
           
            if ($('#appointments-chart').length) {
                loadAppointmentsChart();
            }
            
       
            showNotification('Page content has been refreshed.', 'info');
        }, 300000); 
    }


    $(document).on('click', function() {
        if (!autoUpdateTimer) {
            startAutoUpdateTimer();
        }
    });


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