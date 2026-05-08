

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