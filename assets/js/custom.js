

/*=========Smooth Scroll==========*/
(() => {
  const lerp = (start, end, factor) => {
    return start * (1 - factor) + end * factor;
  };

  const body = document.body;
  const scrollWrap = document.querySelector(".smooth-scroll");

  let current = 0;
  let target = 0;
  let ease = 0.075;

  function setBodyHeight() {
    body.style.height = `${scrollWrap.getBoundingClientRect().height}px`;
  }

  function smoothScroll() {
    target = window.scrollY;
    current = lerp(current, target, ease);

    if (Math.abs(target - current) < 0.1) {
      current = target;
    }

    scrollWrap.style.transform = `translate3d(0, -${current}px, 0)`;

    requestAnimationFrame(smoothScroll);
  }

  window.addEventListener("resize", setBodyHeight);

  window.addEventListener("load", () => {
    setBodyHeight();
    smoothScroll();
  });
})();



/*=========Counter==========*/
const counters = document.querySelectorAll('.counter');
const animateCounter = (counter) => {
  const target = +counter.dataset.target;
  const suffix = counter.dataset.suffix || '';
  const prefix = counter.dataset.prefix || '';

  let count = 0;

  const speed = target / 80;

  const update = () => {
    count += speed;

    if (count < target) {
      counter.innerText =
        prefix + Math.floor(count) + suffix;
      requestAnimationFrame(update);
    } else {
      counter.innerText =
        prefix + target + suffix;
    }
  };

  update();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .5 });

counters.forEach(counter => {
  observer.observe(counter);
});



/*=========Solutions Slider==========*/
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.solution-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;
const totalSlides = slides.length;

function updateSlider() {
  track.style.transform =
    `translateX(-${currentSlide * 100}%)`;

  if (currentSlide === 0) {
    prevBtn.classList.add('disabled');
    prevBtn.disabled = true;
  } else {
    prevBtn.classList.remove('disabled');
    prevBtn.disabled = false;
  }
  if (currentSlide === totalSlides - 1) {
    nextBtn.classList.add('disabled');
    nextBtn.disabled = true;
  } else {
    nextBtn.classList.remove('disabled');
    nextBtn.disabled = false;
  }
}

nextBtn.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
});

updateSlider();


/*==================FAQ Accordion====================*/
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  question.addEventListener('click', () => {
    const isActive =
      item.classList.contains('active');
    faqItems.forEach(faq => {
      faq.classList.remove('active');
      const faqAnswer =
        faq.querySelector('.faq-answer');
      faqAnswer.style.height = "0px";
    });

    /* reopen clicked */
    if (!isActive) {
      item.classList.add('active');
      answer.style.height =
        answer.scrollHeight + "px";
    }
  });
});