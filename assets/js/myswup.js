document.addEventListener("DOMContentLoaded", () => {

  // Script JS codes
  class Demo {
    constructor() {
      this.initSVG();
      this.initCursor();
      this.initHovers();
    }

    initSVG(){
      $(document).mousemove(function(event){

        $("mask polygon").each(function(index, element){

            var xPos = (event.clientX/$(window).width())-0.5,
              yPos = (event.clientY/$(window).height())-0.5,
              box = element;

          TweenLite.to(box, 1, {
            rotationY: xPos * 100,
            rotationX: yPos * 100,
            ease: Power1.easeOut,
          });

          });
      });
    }

    initCursor() {
      const { Back } = window;
      this.outerCursor = document.querySelector(".circle-cursor--outer");
      this.innerCursor = document.querySelector(".circle-cursor--inner");
      this.outerCursorBox = this.outerCursor.getBoundingClientRect();
      this.outerCursorSpeed = 0;
      this.easing = Back.easeOut.config(1.7);
      this.clientX = -100;
      this.clientY = -100;
      this.showCursor = false;

      const unveilCursor = () => {
        TweenMax.set(this.innerCursor, {
          x: this.clientX,
          y: this.clientY
        });
        TweenMax.set(this.outerCursor, {
          x: this.clientX - this.outerCursorBox.width / 2,
          y: this.clientY - this.outerCursorBox.height / 2
        });
        setTimeout(() => {
          this.outerCursorSpeed = 0.2;
        }, 100);
        this.showCursor = true;
      };
      document.addEventListener("mousemove", unveilCursor);

      document.addEventListener("mousemove", e => {
        this.clientX = e.clientX;
        this.clientY = e.clientY;
      });

      const render = () => {
        TweenMax.set(this.innerCursor, {
          x: this.clientX,
          y: this.clientY
        });
        if (!this.isStuck) {
          TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
            x: this.clientX - this.outerCursorBox.width / 2,
            y: this.clientY - this.outerCursorBox.height / 2
          });
        }
        if (this.showCursor) {
          document.removeEventListener("mousemove", unveilCursor);
        }
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    }

    initHovers() {
      const handleMouseEnter = e => {
        this.isStuck = true;
        const target = e.currentTarget;
        const box = target.getBoundingClientRect();
        this.outerCursorOriginals = {
          width: this.outerCursorBox.width,
          height: this.outerCursorBox.height
        };
        TweenMax.to(this.outerCursor, 0.2, {
          x: box.left,
          y: box.top,
          width: box.width,
          height: box.height,
          opacity: 0.4,
          borderColor: "#fff"
        });
      };

      const handleMouseLeave = () => {
        this.isStuck = false;
        TweenMax.to(this.outerCursor, 0.2, {
          width: this.outerCursorOriginals.width,
          height: this.outerCursorOriginals.height,
          opacity: 0.2,
          borderColor: "#fff"
        });
      };

      const mainNavHoverTween = TweenMax.to(this.outerCursor, 0.3, {
        backgroundColor: "#fff",
        ease: this.easing,
        paused: true,
        opacity: 0.2,
      });

      const mainNavMouseEnter = () => {
        this.outerCursorSpeed = 0;
        TweenMax.set(this.innerCursor, { opacity: 0 });
        mainNavHoverTween.play();
      };

      const mainNavMouseLeave = () => {
        this.outerCursorSpeed = 0.2;
        TweenMax.set(this.innerCursor, { opacity: 1 });
        mainNavHoverTween.reverse();
      };

      const mainNavLinks = document.querySelectorAll(".page a");
      mainNavLinks.forEach(item => {
        item.addEventListener("mouseenter", mainNavMouseEnter);
        item.addEventListener("mouseleave", mainNavMouseLeave);
      });
    }
  }

  const demo = new Demo();
  // Script JS codes



  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('load', setVh);
  window.addEventListener('resize', setVh);

  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  $('#overlay li a').on('click', function(){
      // $("overlay").hide();
      $("#toggle").toggleClass("active");
      $("#overlay").toggleClass("open");
  });

  if (matchMedia) {
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }
        // media query change
  function WidthChange(mq) {
    if (mq.matches) {
      lightbox.classList.replace("glightbox", "mediabox");
      lightbox2.classList.replace("glightbox", "mediabox");
      lightbox3.classList.replace("glightbox", "mediabox");
    }
  }

  ScrollReveal({ distance: '1rem' }).reveal('.client-sr', { delay: 100, interval: 50, origin: 'bottom' });
  ScrollReveal({ distance: '1rem' }).reveal('.task-sr', { delay: 100, interval: 50, origin: 'bottom' });

  ScrollReveal({ distance: '1rem' }).reveal('.descript-sr', { delay: 200, interval: 50, origin: 'bottom' });

  ScrollReveal({ distance: '1rem' }).reveal('.film-sr', { delay: 100, interval: 50, origin: 'bottom' });
  ScrollReveal({ distance: '1rem' }).reveal('.video-player', { delay: 200, interval: 50, origin: 'bottom' });
  ScrollReveal({ distance: '1rem' }).reveal('.language-sr', { delay: 600, interval: 50, origin: 'bottom' });

  ScrollReveal({ distance: '6rem' }).reveal('.line-sr', { delay: 200, interval: 50, origin: 'left' });

  const lightbox = GLightbox({
    touchNavigation: true,
    autoplayVideos: true,
    closeOnOutsideClick: true,
    svg: {},
    plyr: {
      css: 'assets/css/plyr.css', // Custom Colored Version
      config: {
          ratio: '16:9',
          muted: false,
          hideControls: true,
          vimeo: {
              byline: false,
              portrait: false,
              title: false,
              speed: true,
              transparent: false
          }
      }
    }
  });


  const options = [
    {
      from: '(.*)',
      to: '(.*)',
      in: function(next) {
          anime({
          targets: '.bg-white',
          width: '100%', // -> from '28px' to '100%',
          easing: 'easeInOutCirc',
          direction: 'reverse',
          loop: 1,
          translateX: {
          value: '100%',
          duration: 1200
          },
        });
      },
      out: (next) => {
          setTimeout(next, 2000);
          anime({
          targets: '.bg-white',
          width: '100%', // -> from '28px' to '100%',
          easing: 'easeInOutCirc',
          direction: 'reverse',
          loop: 1,
          translateX: {
          value: '100%',
          duration: 1200
          },
        });
      }
    }
  ];

    const swup = new Swup({
      plugins: [
        new SwupJsPlugin(options),
        new SwupScriptsPlugin(),
        new SwupScrollPlugin()
      ],
    });

    function init() {

      // Codes to work after slide

          const setVh_new = () => {
            const vh_new = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh_new}px`);
          };

          window.addEventListener('load', setVh_new);
          window.addEventListener('resize', setVh_new);

          $('#toggle').click(function() {
            $(this).toggleClass('active');
            $('#overlay').toggleClass('open');
          });

          $('#overlay li a').on('click', function(){
              // $("overlay").hide();
              $("#toggle").toggleClass("active");
              $("#overlay").toggleClass("open");
          });

          if (matchMedia) {
            const mq_new = window.matchMedia("(max-width: 767px)");
            mq_new.addListener(WidthChange);
            WidthChange(mq_new);
          }
                // media query change
          function WidthChange(mq) {
            if (mq.matches) {
              lightbox_new.classList.replace("glightbox", "mediabox");
              lightbox_new2.classList.replace("glightbox", "mediabox");
              lightbox_new2.classList.replace("glightbox", "mediabox");
            }
          }

          ScrollReveal({ distance: '1rem' }).reveal('.client-sr', { delay: 100, interval: 50, origin: 'bottom' });
          ScrollReveal({ distance: '1rem' }).reveal('.task-sr', { delay: 100, interval: 50, origin: 'bottom' });

          ScrollReveal({ distance: '1rem' }).reveal('.descript-sr', { delay: 200, interval: 50, origin: 'bottom' });

          ScrollReveal({ distance: '1rem' }).reveal('.film-sr', { delay: 100, interval: 50, origin: 'bottom' });
          ScrollReveal({ distance: '1rem' }).reveal('.video-player', { delay: 200, interval: 50, origin: 'bottom' });
          ScrollReveal({ distance: '1rem' }).reveal('.language-sr', { delay: 600, interval: 50, origin: 'bottom' });

          ScrollReveal({ distance: '6rem' }).reveal('.line-sr', { delay: 200, interval: 50, origin: 'left' });

          const lightbox_new = GLightbox({
            touchNavigation: true,
            autoplayVideos: true,
            closeOnOutsideClick: true,
            svg: {},
            plyr: {
              css: 'assets/css/plyr.css', // Custom Colored Version
              config: {
                  ratio: '16:9',
                  muted: false,
                  hideControls: true,
                  vimeo: {
                      byline: false,
                      portrait: false,
                      title: false,
                      speed: true,
                      transparent: false
                  }
              }
            }
          });
      // Codes to work after slide


      MediaBox('.mediabox');
    }

    swup.on('contentReplaced', init);

    function unload() {
      if (document.querySelector('#case-study-link')) {
          // carousel.destroy()
      }
      // ...
    }
    swup.on('willReplaceContent', unload);
});