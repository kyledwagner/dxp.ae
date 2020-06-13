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

  document.addEventListener("DOMContentLoaded", () => {
    function init() {
      if (document.querySelector('#case-study-link')) {
        const swup = new Swup();
        MediaBox('.mediabox');
        // run once
        init();
        // this event runs for every page view after initial load
        swup.on('contentReplaced', init);
      }
    }
    function unload() {
      if (document.querySelector('#case-study-link')) {
          // carousel.destroy()
      }
      // ...
  }
    swup.on('willReplaceContent', unload);
});