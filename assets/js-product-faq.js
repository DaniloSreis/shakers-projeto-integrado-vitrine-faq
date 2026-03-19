const faqItems = document.querySelectorAll('.product-faq__item');

faqItems.forEach(item => {
  const button = item.querySelector('.product-faq__button');

  if (button) {
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      faqItems.forEach(question => {
        question.classList.remove('is-active');
        question.querySelector('.product-faq__button').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('is-active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  }
});