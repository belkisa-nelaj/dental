document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-toggle i');

        answer.classList.toggle('active');
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');
        
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item.contains(question)) return;
            
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-toggle i');
            
            otherAnswer.classList.remove('active');
            otherIcon.classList.remove('fa-minus');
            otherIcon.classList.add('fa-plus');
        });
    });
});