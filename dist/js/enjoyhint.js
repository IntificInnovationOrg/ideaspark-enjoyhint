"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

window.EnjoyHint = function (_options) {
  var $eventElement;
  var that = this;
  var defaults = {
    onStart: function onStart() {},
    onEnd: function onEnd() {},
    onSkip: function onSkip() {},
    onNext: function onNext() {}
  };
  var options = $.extend(defaults, _options);
  var data = [];
  var currentStep = 0;
  var $body = $('body');
  /** ******************* PRIVATE METHODS ************************************** */

  var init = function init() {
    var ehEl = $('.enjoyhint');

    if (ehEl.length) {
      ehEl.remove();
    }

    $body.css({
      overflow: 'hidden'
    });
    $(document).on('touchmove', lockTouch);
    $body.enjoyhint({
      onNextClick: function onNextClick() {
        nextStep();
      },
      onSkipClick: function () {
        var _onSkipClick = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return options.onSkip();

                case 2:
                  skipAll();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function onSkipClick() {
          return _onSkipClick.apply(this, arguments);
        }

        return onSkipClick;
      }()
    });
  };

  function lockTouch(e) {
    e.preventDefault();
  }

  var destroyEnjoy = function destroyEnjoy() {
    $('.enjoyhint').remove();
    $body.css({
      overflow: ''
    });
    $(document).off('touchmove', lockTouch);
  };

  that.clear = function () {
    var $nextBtn = $('.enjoyhint_next_btn');
    var $skipBtn = $('.enjoyhint_skip_btn');
    $nextBtn.removeClass(that.nextUserClass);
    $nextBtn.text('Next');
    $skipBtn.removeClass(that.skipUserClass);
    $skipBtn.text('Skip');
  };

  function stepAction() {
    return _stepAction.apply(this, arguments);
  }

  function _stepAction() {
    _stepAction = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var $enjoyhint, stepData, timeout;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (data && data[currentStep]) {
                _context3.next = 6;
                break;
              }

              $body.enjoyhint('hide');
              _context3.next = 4;
              return options.onEnd();

            case 4:
              destroyEnjoy();
              return _context3.abrupt("return");

            case 6:
              _context3.next = 8;
              return options.onNext();

            case 8:
              $enjoyhint = $('.enjoyhint');
              $enjoyhint.removeClass("enjoyhint-step-".concat(currentStep));
              $enjoyhint.removeClass("enjoyhint-step-".concat(currentStep + 1));
              $enjoyhint.addClass("enjoyhint-step-".concat(currentStep + 1));
              stepData = data[currentStep];

              if (Object.prototype.hasOwnProperty.call(stepData, 'onBeforeStart') && typeof stepData.onBeforeStart === 'function') {
                stepData.onBeforeStart();
              }

              timeout = stepData.timeout || 0;
              setTimeout(function () {
                if (!stepData.selector) {
                  Object.keys(stepData).forEach(function (prop) {
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

                setTimeout(function () {
                  that.clear();
                }, 250);
                $(document.body).scrollTo(stepData.selector, stepData.scrollAnimationSpeed || 250, {
                  offset: -100
                });
                setTimeout(function () {
                  var $element = $(stepData.selector);
                  var event = makeEventName(stepData.event);
                  $body.enjoyhint('show');
                  $body.enjoyhint('hide_next');
                  $eventElement = $element;

                  if (stepData.event_selector) {
                    $eventElement = $(stepData.event_selector);
                  }

                  if (!stepData.event_type && stepData.event === 'key') {
                    $element.keydown(function (keydownEvent) {
                      if (keydownEvent.which === stepData.keyCode) {
                        currentStep += 1;
                        stepAction();
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
                    var $nextBtn = $('.enjoyhint_next_btn');
                    $nextBtn.addClass(stepData.nextButton.className || '');
                    $nextBtn.text(stepData.nextButton.text || 'Next');
                    that.nextUserClass = stepData.nextButton.className;
                  }

                  if (stepData.skipButton) {
                    var $skipBtn = $('.enjoyhint_skip_btn');
                    $skipBtn.addClass(stepData.skipButton.className || '');
                    $skipBtn.text(stepData.skipButton.text || 'Skip');
                    that.skipUserClass = stepData.skipButton.className;
                  }

                  if (stepData.event_type) {
                    switch (stepData.event_type) {
                      case 'auto':
                        $element[stepData.event]();
                        currentStep += 1;
                        stepAction();
                        return;

                      case 'custom':
                        on(stepData.event, function () {
                          currentStep += 1;
                          off(stepData.event);
                          stepAction();
                        });
                        break;

                      case 'next':
                        $body.enjoyhint('show_next');
                        break;

                      default: // noop

                    }
                  } else {
                    $eventElement.on(event, function (e) {
                      if (stepData.keyCode && e.keyCode !== stepData.keyCode) {
                        return;
                      }

                      currentStep += 1;
                      $(this).off(event);
                      stepAction(); // clicked
                    });
                  }

                  var maxDim = Math.max($element.outerWidth(), $element.outerHeight());
                  var radius = stepData.radius || Math.round(maxDim / 2) + 5;
                  var offset = $element.offset();
                  var w = $element.outerWidth();
                  var h = $element.outerHeight();
                  var shapeMargin = stepData.margin !== undefined ? stepData.margin : 10;
                  var coords = {
                    x: offset.left + Math.round(w / 2),
                    y: offset.top + Math.round(h / 2) - $(document).scrollTop()
                  };
                  var shapeData = {
                    enjoyHintElementSelector: stepData.selector,
                    center_x: coords.x,
                    center_y: coords.y,
                    text: stepData.description,
                    top: stepData.top,
                    bottom: stepData.bottom,
                    left: stepData.left,
                    right: stepData.right,
                    margin: stepData.margin,
                    scroll: stepData.scroll
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

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _stepAction.apply(this, arguments);
  }

  function nextStep() {
    currentStep += 1;
    stepAction();
  }

  function skipAll() {
    var stepData = data[currentStep];
    var $element = $(stepData.selector);
    off(stepData.event);
    $element.off(makeEventName(stepData.event));
    destroyEnjoy();
  }

  function makeEventName(name, isCustom) {
    return "".concat(name + (isCustom ? 'custom' : ''), ".enjoy_hint");
  }

  function on(eventName, callback) {
    $body.on(makeEventName(eventName, true), callback);
  }

  function off(eventName) {
    $body.off(makeEventName(eventName, true));
  }
  /** ******************* PUBLIC METHODS ************************************** */


  that.stop = function () {
    skipAll();
  };

  that.reRunScript = function (cs) {
    currentStep = cs;
    stepAction();
  };

  that.runScript =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            currentStep = 0;
            _context2.next = 3;
            return options.onStart();

          case 3:
            stepAction();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  that.resumeScript = function () {
    stepAction();
  };

  that.setCurrentStep = function (cs) {
    currentStep = cs;
  };

  that.getCurrentStep = function () {
    return currentStep;
  };

  that.trigger = function (eventName) {
    switch (eventName) {
      case 'next':
        nextStep();
        break;

      case 'skip':
        skipAll();
        break;

      default: // noop

    }
  };

  that.setScript = function (_data) {
    if (_data) {
      data = _data;
    }
  }; // support deprecated API methods


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
