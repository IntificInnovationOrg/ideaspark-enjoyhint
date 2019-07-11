window.EnjoyHint = function (_options) {
  let $eventElement;

  const that = this;

  const defaults = {

    async onStart() {
      return Promise.resolve();
    },

    async onEnd() {
      return Promise.resolve();
    },

    async onSkip() {
      return Promise.resolve();
    },

    async onNext() {
      return Promise.resolve();
    },
  };

  const options = $.extend(defaults, _options);

  let data = [];
  let currentStep = 0;

  const $body = $('body');


  /** ******************* PRIVATE METHODS ************************************** */

  function makeEventName(name, isCustom) {
    return `${name + (isCustom ? 'custom' : '')}.enjoy_hint`;
  }


  function on(eventName, callback) {
    $body.on(makeEventName(eventName, true), callback);
  }

  function off(eventName) {
    $body.off(makeEventName(eventName, true));
  }

  async function stepAction() {
    if (!(data && data[currentStep])) {
      $body.enjoyhint('hide');

      await options.onEnd();

      destroyEnjoy();

      return;
    }

    await options.onNext();

    const $enjoyhint = $('.enjoyhint');

    $enjoyhint.removeClass(`enjoyhint-step-${currentStep}`);
    $enjoyhint.removeClass(`enjoyhint-step-${currentStep + 1}`);
    $enjoyhint.addClass(`enjoyhint-step-${currentStep + 1}`);

    const stepData = data[currentStep];

    if (Object.prototype.hasOwnProperty.call(stepData, 'onBeforeStart') &&
      typeof stepData.onBeforeStart === 'function') {
      await stepData.onBeforeStart();
    }

    const timeout = stepData.timeout || 0;

    setTimeout(() => {
      if (!stepData.selector) {
        Object.keys(stepData).forEach((prop) => {
          if (Object.prototype.hasOwnProperty.call(stepData, prop) && prop.split(' ')[1]) {
            stepData.selector = prop.split(' ')[1];
            stepData.event = prop.split(' ')[0];

            if (prop.split(' ')[0] === 'next' || prop.split(' ')[0] === 'auto' || prop.split(' ')[0] === 'custom') {
              stepData.event_type = prop.split(' ')[0];
            }

            stepData.description = stepData[prop];
          }
        });
      }

      setTimeout(() => {
        that.clear();
      }, 250);

      $(document.body).scrollTo(stepData.selector, stepData.scrollAnimationSpeed || 250, { offset: -100 });

      setTimeout(async () => {
        const $element = $(stepData.selector);
        const event = makeEventName(stepData.event);

        $body.enjoyhint('show');
        $body.enjoyhint('hide_next');
        $eventElement = $element;

        if (stepData.event_selector) {
          $eventElement = $(stepData.event_selector);
        }

        if (!stepData.event_type && stepData.event === 'key') {
          $element.keydown(async (keydownEvent) => {
            if (keydownEvent.which === stepData.keyCode) {
              currentStep += 1;
              await stepAction();
            }
          });
        }

        if (stepData.showNext === true) {
          $body.enjoyhint('show_next');
        }

        if (stepData.showSkip === false) {
          $body.enjoyhint('hide_skip');
        } else {
          $body.enjoyhint('show_skip');
        }

        if (stepData.nextButton) {
          const $nextBtn = $('.enjoyhint_next_btn');

          $nextBtn.addClass(stepData.nextButton.className || '');
          $nextBtn.text(stepData.nextButton.text || 'Next');
          that.nextUserClass = stepData.nextButton.className;
        }

        if (stepData.skipButton) {
          const $skipBtn = $('.enjoyhint_skip_btn');

          $skipBtn.addClass(stepData.skipButton.className || '');
          $skipBtn.text(stepData.skipButton.text || 'Skip');
          that.skipUserClass = stepData.skipButton.className;
        }

        if (stepData.event_type) {
          switch (stepData.event_type) {
            case 'auto':
              $element[stepData.event]();

              currentStep += 1;
              await stepAction();

              return;

            case 'custom':
              on(stepData.event, async () => {
                currentStep += 1;
                off(stepData.event);
                await stepAction();
              });

              break;

            case 'next':
              $body.enjoyhint('show_next');
              break;

            default:
            // noop
          }
        } else {
          $eventElement.on(event, async function (e) {
            if (stepData.keyCode && e.keyCode !== stepData.keyCode) {
              return;
            }

            currentStep += 1;

            $(this).off(event);

            await stepAction(); // clicked
          });
        }

        const maxDim = Math.max($element.outerWidth(), $element.outerHeight());
        const radius = stepData.radius || Math.round(maxDim / 2) + 5;
        const offset = $element.offset();
        const w = $element.outerWidth();
        const h = $element.outerHeight();
        const shapeMargin = (stepData.margin !== undefined) ? stepData.margin : 10;

        const coords = {
          x: offset.left + Math.round(w / 2),
          y: offset.top + Math.round(h / 2) - $(document).scrollTop(),
        };

        const shapeData = {
          enjoyHintElementSelector: stepData.selector,
          center_x: coords.x,
          center_y: coords.y,
          text: stepData.description,
          top: stepData.top,
          bottom: stepData.bottom,
          left: stepData.left,
          right: stepData.right,
          margin: stepData.margin,
          scroll: stepData.scroll,
        };

        if (stepData.shape && stepData.shape === 'circle') {
          shapeData.shape = 'circle';
          shapeData.radius = radius;
        } else {
          shapeData.radius = 0;
          shapeData.width = w + shapeMargin;
          shapeData.height = h + shapeMargin;
        }

        $body.enjoyhint('render_label_with_shape', shapeData, that.stop);
      }, stepData.scrollAnimationSpeed + 20 || 270);
    }, timeout);
  }

  async function nextStep() {
    currentStep += 1;
    await stepAction();
  }

  function skipAll() {
    const stepData = data[currentStep];
    const $element = $(stepData.selector);

    off(stepData.event);
    $element.off(makeEventName(stepData.event));

    destroyEnjoy();
  }

  const init = function () {
    const ehEl = $('.enjoyhint');

    if (ehEl.length) {
      ehEl.remove();
    }

    $body.css({ overflow: 'hidden' });

    $(document).on('touchmove', lockTouch);

    $body.enjoyhint({

      async onNextClick() {
        await nextStep();
      },

      async onSkipClick() {
        await options.onSkip();
        skipAll();
      },
    });
  };

  function lockTouch(e) {
    e.preventDefault();
  }

  const destroyEnjoy = function () {
    $('.enjoyhint').remove();
    $body.css({ overflow: '' });
    $(document).off('touchmove', lockTouch);
  };

  that.clear = function () {
    const $nextBtn = $('.enjoyhint_next_btn');
    const $skipBtn = $('.enjoyhint_skip_btn');

    $nextBtn.removeClass(that.nextUserClass);
    $nextBtn.text('Next');
    $skipBtn.removeClass(that.skipUserClass);
    $skipBtn.text('Skip');
  };

  /** ******************* PUBLIC METHODS ************************************** */

  that.stop = function () {
    skipAll();
  };

  that.reRunScript = async function (cs) {
    currentStep = cs;
    await stepAction();
  };

  that.runScript = async function () {
    currentStep = 0;

    await options.onStart();

    await stepAction();
  };

  that.resumeScript = async function () {
    await stepAction();
  };

  that.setCurrentStep = function (cs) {
    currentStep = cs;
  };

  that.getCurrentStep = function () {
    return currentStep;
  };

  that.trigger = async function (eventName) {
    switch (eventName) {
      case 'next':
        await nextStep();
        break;

      case 'skip':
        skipAll();
        break;

      default:
      // noop
    }
  };

  that.setScript = function (_data) {
    if (_data) {
      data = _data;
    }
  };

  // support deprecated API methods
  that.set = function (_data) {
    that.setScript(_data);
  };

  that.setSteps = function (_data) {
    that.setScript(_data);
  };

  that.run = function () {
    that.runScript();
  };

  that.resume = function () {
    that.resumeScript();
  };

  init();
};
