
  
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
