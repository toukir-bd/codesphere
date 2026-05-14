

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




/*==================Navbar====================*/
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileClose = document.querySelector('.mobile-close');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');

/* =========================
CHECK IF ELEMENTS EXIST
========================= */
if (mobileToggle && mobileClose && navMenu) {
    /* OPEN */
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');
    });

    /* CLOSE */
    mobileClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        navItems.forEach(item => {
            item.classList.remove('active');
        });
    });

    /* MOBILE ACCORDION */
    navItems.forEach(item => {
        const trigger = item.querySelector(':scope > a');
        const megaMenu = item.querySelector('.mega-menu');
        if (trigger && megaMenu) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    const isActive = item.classList.contains('active');
                    navItems.forEach(nav => {
                        nav.classList.remove('active');
                    });
                    if (!isActive) {
                        item.classList.add('active');
                    }
                }
            });
        }
    });
}


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



/*==================Back to Top====================*/
const backToTop =
  document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
