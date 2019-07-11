"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

window.EnjoyHint = function (_options) {
  var $eventElement;
  var that = this;
  var defaults = {
    onStart: function () {
      var _onStart = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", Promise.resolve());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onStart() {
        return _onStart.apply(this, arguments);
      }

      return onStart;
    }(),
    onEnd: function () {
      var _onEnd = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", Promise.resolve());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onEnd() {
        return _onEnd.apply(this, arguments);
      }

      return onEnd;
    }(),
    onSkip: function () {
      var _onSkip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", Promise.resolve());

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function onSkip() {
        return _onSkip.apply(this, arguments);
      }

      return onSkip;
    }(),
    onNext: function () {
      var _onNext = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", Promise.resolve());

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function onNext() {
        return _onNext.apply(this, arguments);
      }

      return onNext;
    }()
  };
  var options = $.extend(defaults, _options);
  var data = [];
  var currentStep = 0;
  var $body = $('body');
  /** ******************* PRIVATE METHODS ************************************** */

  function makeEventName(name, isCustom) {
    return "".concat(name + (isCustom ? 'custom' : ''), ".enjoy_hint");
  }

  function on(eventName, callback) {
    $body.on(makeEventName(eventName, true), callback);
  }

  function off(eventName) {
    $body.off(makeEventName(eventName, true));
  }

  function stepAction() {
    return _stepAction.apply(this, arguments);
  }

  function _stepAction() {
    _stepAction = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var $enjoyhint, stepData, timeout;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (data && data[currentStep]) {
                _context15.next = 6;
                break;
              }

              $body.enjoyhint('hide');
              _context15.next = 4;
              return options.onEnd();

            case 4:
              destroyEnjoy();
              return _context15.abrupt("return");

            case 6:
              _context15.next = 8;
              return options.onNext();

            case 8:
              $enjoyhint = $('.enjoyhint');
              $enjoyhint.removeClass("enjoyhint-step-".concat(currentStep));
              $enjoyhint.removeClass("enjoyhint-step-".concat(currentStep + 1));
              $enjoyhint.addClass("enjoyhint-step-".concat(currentStep + 1));
              stepData = data[currentStep];

              if (!(Object.prototype.hasOwnProperty.call(stepData, 'onBeforeStart') && typeof stepData.onBeforeStart === 'function')) {
                _context15.next = 16;
                break;
              }

              _context15.next = 16;
              return stepData.onBeforeStart();

            case 16:
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
                setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee14() {
                  var $element, event, $nextBtn, $skipBtn, maxDim, radius, offset, w, h, shapeMargin, coords, shapeData;
                  return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                      switch (_context14.prev = _context14.next) {
                        case 0:
                          $element = $(stepData.selector);
                          event = makeEventName(stepData.event);
                          $body.enjoyhint('show');
                          $body.enjoyhint('hide_next');
                          $eventElement = $element;

                          if (stepData.event_selector) {
                            $eventElement = $(stepData.event_selector);
                          }

                          if (!stepData.event_type && stepData.event === 'key') {
                            $element.keydown(
                            /*#__PURE__*/
                            function () {
                              var _ref6 = _asyncToGenerator(
                              /*#__PURE__*/
                              regeneratorRuntime.mark(function _callee11(keydownEvent) {
                                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                  while (1) {
                                    switch (_context11.prev = _context11.next) {
                                      case 0:
                                        if (!(keydownEvent.which === stepData.keyCode)) {
                                          _context11.next = 4;
                                          break;
                                        }

                                        currentStep += 1;
                                        _context11.next = 4;
                                        return stepAction();

                                      case 4:
                                      case "end":
                                        return _context11.stop();
                                    }
                                  }
                                }, _callee11);
                              }));

                              return function (_x3) {
                                return _ref6.apply(this, arguments);
                              };
                            }());
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
                            $nextBtn = $('.enjoyhint_next_btn');
                            $nextBtn.addClass(stepData.nextButton.className || '');
                            $nextBtn.text(stepData.nextButton.text || 'Next');
                            that.nextUserClass = stepData.nextButton.className;
                          }

                          if (stepData.skipButton) {
                            $skipBtn = $('.enjoyhint_skip_btn');
                            $skipBtn.addClass(stepData.skipButton.className || '');
                            $skipBtn.text(stepData.skipButton.text || 'Skip');
                            that.skipUserClass = stepData.skipButton.className;
                          }

                          if (!stepData.event_type) {
                            _context14.next = 26;
                            break;
                          }

                          _context14.t0 = stepData.event_type;
                          _context14.next = _context14.t0 === 'auto' ? 15 : _context14.t0 === 'custom' ? 20 : _context14.t0 === 'next' ? 22 : 24;
                          break;

                        case 15:
                          $element[stepData.event]();
                          currentStep += 1;
                          _context14.next = 19;
                          return stepAction();

                        case 19:
                          return _context14.abrupt("return");

                        case 20:
                          on(stepData.event,
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee12() {
                            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                              while (1) {
                                switch (_context12.prev = _context12.next) {
                                  case 0:
                                    currentStep += 1;
                                    off(stepData.event);
                                    _context12.next = 4;
                                    return stepAction();

                                  case 4:
                                  case "end":
                                    return _context12.stop();
                                }
                              }
                            }, _callee12);
                          })));
                          return _context14.abrupt("break", 24);

                        case 22:
                          $body.enjoyhint('show_next');
                          return _context14.abrupt("break", 24);

                        case 24:
                          _context14.next = 27;
                          break;

                        case 26:
                          $eventElement.on(event,
                          /*#__PURE__*/
                          function () {
                            var _ref8 = _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee13(e) {
                              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                while (1) {
                                  switch (_context13.prev = _context13.next) {
                                    case 0:
                                      if (!(stepData.keyCode && e.keyCode !== stepData.keyCode)) {
                                        _context13.next = 2;
                                        break;
                                      }

                                      return _context13.abrupt("return");

                                    case 2:
                                      currentStep += 1;
                                      $(this).off(event);
                                      _context13.next = 6;
                                      return stepAction();

                                    case 6:
                                    case "end":
                                      return _context13.stop();
                                  }
                                }
                              }, _callee13, this);
                            }));

                            return function (_x4) {
                              return _ref8.apply(this, arguments);
                            };
                          }());

                        case 27:
                          maxDim = Math.max($element.outerWidth(), $element.outerHeight());
                          radius = stepData.radius || Math.round(maxDim / 2) + 5;
                          offset = $element.offset();
                          w = $element.outerWidth();
                          h = $element.outerHeight();
                          shapeMargin = stepData.margin !== undefined ? stepData.margin : 10;
                          coords = {
                            x: offset.left + Math.round(w / 2),
                            y: offset.top + Math.round(h / 2) - $(document).scrollTop()
                          };
                          shapeData = {
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

                        case 37:
                        case "end":
                          return _context14.stop();
                      }
                    }
                  }, _callee14);
                })), stepData.scrollAnimationSpeed + 20 || 270);
              }, timeout);

            case 18:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));
    return _stepAction.apply(this, arguments);
  }

  function nextStep() {
    return _nextStep.apply(this, arguments);
  }

  function _nextStep() {
    _nextStep = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              currentStep += 1;
              _context16.next = 3;
              return stepAction();

            case 3:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));
    return _nextStep.apply(this, arguments);
  }

  function skipAll() {
    var stepData = data[currentStep];
    var $element = $(stepData.selector);
    off(stepData.event);
    $element.off(makeEventName(stepData.event));
    destroyEnjoy();
  }

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
      onNextClick: function () {
        var _onNextClick = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5() {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return nextStep();

                case 2:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        function onNextClick() {
          return _onNextClick.apply(this, arguments);
        }

        return onNextClick;
      }(),
      onSkipClick: function () {
        var _onSkipClick = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee6() {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return options.onSkip();

                case 2:
                  skipAll();

                case 3:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
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
  /** ******************* PUBLIC METHODS ************************************** */


  that.stop = function () {
    skipAll();
  };

  that.reRunScript =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(cs) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              currentStep = cs;
              _context7.next = 3;
              return stepAction();

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  that.runScript =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            currentStep = 0;
            _context8.next = 3;
            return options.onStart();

          case 3:
            _context8.next = 5;
            return stepAction();

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  that.resumeScript =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return stepAction();

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  that.setCurrentStep = function (cs) {
    currentStep = cs;
  };

  that.getCurrentStep = function () {
    return currentStep;
  };

  that.trigger =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(eventName) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.t0 = eventName;
              _context10.next = _context10.t0 === 'next' ? 3 : _context10.t0 === 'skip' ? 6 : 8;
              break;

            case 3:
              _context10.next = 5;
              return nextStep();

            case 5:
              return _context10.abrupt("break", 8);

            case 6:
              skipAll();
              return _context10.abrupt("break", 8);

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

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
