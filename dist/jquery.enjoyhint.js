"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  var effectiveRad = r;

  if (w < 2 * effectiveRad) {
    effectiveRad = w / 2;
  }

  if (h < 2 * effectiveRad) {
    effectiveRad = h / 2;
  }

  this.beginPath();
  this.moveTo(x + effectiveRad, y);
  this.arcTo(x + w, y, x + w, y + h, effectiveRad);
  this.arcTo(x + w, y + h, x, y + h, effectiveRad);
  this.arcTo(x, y + h, x, y, effectiveRad);
  this.arcTo(x, y, x + w, y, effectiveRad);
  this.closePath();
  return this;
};

(function ($) {
  var self; // noinspection JSUnusedGlobalSymbols

  var methods = {
    init: function init(settings) {
      return this.each(function () {
        function svg(type, params) {
          var el = document.createElementNS('http://www.w3.org/2000/svg', type);
          Object.keys(params).forEach(function (p) {
            return el.setAttribute(p, params[p]);
          });
          return el;
        }

        var fn = {
          onNextClick: function onNextClick() {},
          onSkipClick: function onSkipClick() {},
          animation_time: 800
        };
        this.enjoyhint_obj = {};
        self = this.enjoyhint_obj;

        self.resetComponentStuff = function () {};

        var layersLi = $(this);
        self.options = jQuery.extend(fn, settings);
        self.gcl = {
          chooser: 'enjoyhint'
        };
        self.cl = {
          enjoy_hint: 'enjoyhint',
          hide: 'enjoyhint_hide',
          disable_events_element: 'enjoyhint_disable_events',
          btn: 'enjoyhint_btn',
          skip_btn: 'enjoyhint_skip_btn',
          close_btn: 'enjoyhint_close_btn',
          next_btn: 'enjoyhint_next_btn',
          main_canvas: 'enjoyhint_canvas',
          main_svg: 'enjoyhint_svg',
          svg_wrapper: 'enjoyhint_svg_wrapper',
          svg_transparent: 'enjoyhint_svg_transparent',
          kinetic_container: 'kinetic_container'
        };
        self.canvas_size = {
          w: $(window).width() * 1.4,
          h: $(window).height() * 1.4
        };
        var canvasId = 'enj_canvas';
        self.enjoyhint = $('<div>', {
          "class": "".concat(self.cl.enjoy_hint, " ").concat(self.cl.svg_transparent)
        }).appendTo(layersLi);
        self.enjoyhint_svg_wrapper = $('<div>', {
          "class": "".concat(self.cl.svg_wrapper, " ").concat(self.cl.svg_transparent)
        }).appendTo(self.enjoyhint);
        self.$stage_container = $("<div id=\"".concat(self.cl.kinetic_container, "\">")).appendTo(self.enjoyhint);
        self.$canvas = $("<canvas id=\"".concat(canvasId, "\" width=\"").concat(self.canvas_size.w, "\" height=\"").concat(self.canvas_size.h, "\" ") + "class=\"".concat(self.cl.main_canvas, "\">")).appendTo(self.enjoyhint);
        self.$svg = $("<svg width=\"".concat(self.canvas_size.w, "\" height=\"").concat(self.canvas_size.h, "\" ") + "class=\"".concat(self.cl.main_canvas, " ").concat(self.cl.main_svg, "\">")).appendTo(self.enjoyhint_svg_wrapper);
        var metaElement = $(svg('defs'));
        var el = $(svg('marker', {
          id: 'arrowMarker',
          viewBox: '0 0 36 21',
          refX: '21',
          refY: '10',
          markerUnits: 'strokeWidth',
          orient: 'auto',
          markerWidth: '16',
          markerHeight: '12'
        }));
        var poster = $(svg('path', {
          style: 'fill:none; stroke:rgb(255,255,255); stroke-width:2',
          d: 'M0,0 c30,11 30,9 0,20'
        }));
        metaElement.append(el.append(poster)).appendTo(self.$svg);
        self.kinetic_stage = new Kinetic.Stage({
          container: self.cl.kinetic_container,
          width: self.canvas_size.w,
          height: self.canvas_size.h,
          scaleX: 1
        });
        self.layer = new Kinetic.Layer();
        self.rect = new Kinetic.Rect({
          fill: 'rgba(0,0,0,0.8)',
          width: self.canvas_size.w,
          height: self.canvas_size.h
        });
        var container = $('<div>', {
          "class": self.cl.disable_events_element
        }).appendTo(self.enjoyhint);
        var $plusBtn = container.clone().appendTo(self.enjoyhint);
        var $minusBtn = container.clone().appendTo(self.enjoyhint);
        var tapTargetWave = container.clone().appendTo(self.enjoyhint);

        var click = function click(event) {
          event.stopImmediatePropagation();
        };

        $('button').focusout(click);
        container.click(click);
        $plusBtn.click(click);
        $minusBtn.click(click);
        tapTargetWave.click(click);
        self.$skip_btn = $('<div>', {
          "class": self.cl.skip_btn
        }).appendTo(self.enjoyhint).html('Skip').click(function () {
          self.hide();
          self.options.onSkipClick();
        });
        self.$next_btn = $('<div>', {
          "class": self.cl.next_btn
        }).appendTo(self.enjoyhint).html('Next').click(function () {
          self.options.onNextClick();
        });
        self.$close_btn = $('<div>', {
          "class": self.cl.close_btn
        }).appendTo(self.enjoyhint).html('').click(function () {
          self.hide();
          self.options.onSkipClick();
        });
        self.$canvas.mousedown(function (event) {
          var canvas = $('canvas');
          canvas.css({
            left: '4000px'
          });
          var clearAllItem = document.elementFromPoint(event.clientX, event.clientY);
          canvas.css({
            left: '0px'
          });
          $(clearAllItem).click();
          return false;
        });
        var radius = 0;
        var shapeInitShift = 130; // noinspection JSUnusedGlobalSymbols

        self.shape = new Kinetic.Shape({
          radius: radius,
          center_x: -shapeInitShift,
          center_y: -shapeInitShift,
          width: 0,
          height: 0,
          sceneFunc: function sceneFunc() {
            var ctx = this.getContext('2d')._context;

            var compositeOperation = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            var width = this.attrs.center_x - Math.round(this.attrs.width / 2);
            var y = this.attrs.center_y - Math.round(this.attrs.height / 2);
            ctx.roundRect(width, y, this.attrs.width, this.attrs.height, this.attrs.radius);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.globalCompositeOperation = compositeOperation;
          }
        });
        self.shape.radius = radius;
        self.layer.add(self.rect);
        self.layer.add(self.shape);
        self.kinetic_stage.add(self.layer);

        self.show = function () {
          self.enjoyhint.removeClass(self.cl.hide);
        };

        self.hide = function () {
          self.enjoyhint.addClass(self.cl.hide);
          var explosionSprite = new Kinetic.Tween({
            node: self.shape,
            duration: 0.002,
            center_x: -shapeInitShift,
            center_y: -shapeInitShift
          });
          explosionSprite.play();
        };

        self.hide();

        self.hideNextBtn = function () {
          self.$next_btn.addClass(self.cl.hide);
          self.nextBtn = 'hide';
        };

        self.showNextBtn = function () {
          self.$next_btn.removeClass(self.cl.hide);
          self.nextBtn = 'show';
        };

        self.hideSkipBtn = function () {
          self.$skip_btn.addClass(self.cl.hide);
        };

        self.showSkipBtn = function () {
          self.$skip_btn.removeClass(self.cl.hide);
        };

        self.renderCircle = function (size) {
          var cirRadius = size.r || 0;
          var vx1 = size.x || 0;
          var vy1 = size.y || 0;
          var explosionSprite = new Kinetic.Tween({
            node: self.shape,
            duration: 0.2,
            center_x: vx1,
            center_y: vy1,
            width: cirRadius * 2,
            height: cirRadius * 2,
            radius: cirRadius
          });
          explosionSprite.play();
          var x = vx1 - cirRadius;
          var width = vx1 + cirRadius;
          var y = vy1 - cirRadius;
          var height = vy1 + cirRadius;
          var padding = 20;
          return {
            x: vx1,
            y: vy1,
            left: x,
            right: width,
            top: y,
            bottom: height,
            conn: {
              left: {
                x: x - padding,
                y: vy1
              },
              right: {
                x: width + padding,
                y: vy1
              },
              top: {
                x: vx1,
                y: y - padding
              },
              bottom: {
                x: vx1,
                y: height + padding
              }
            }
          };
        };

        self.renderRect = function (props, duration) {
          var currentRadius = props.r || 0;
          var x = props.x || 0;
          var y = props.y || 0;
          var focusAreaSize = props.w || 0;
          var maskHeight = props.h || 0;
          var rectRadius = 20;
          var explosionSprite = new Kinetic.Tween({
            node: self.shape,
            duration: duration,
            center_x: x,
            center_y: y,
            width: focusAreaSize,
            height: maskHeight,
            radius: currentRadius
          });
          explosionSprite.play();
          var markerSize = Math.round(focusAreaSize / 2);
          var midHeight = Math.round(maskHeight / 2);
          var x1 = x - markerSize;
          var padding = x + markerSize;
          var ypos = y - midHeight;
          var top = y + midHeight;
          return {
            x: x,
            y: y,
            left: x1,
            right: padding,
            top: ypos,
            bottom: top,
            conn: {
              left: {
                x: x1 - rectRadius,
                y: y
              },
              right: {
                x: padding + rectRadius,
                y: y
              },
              top: {
                x: x,
                y: ypos - rectRadius
              },
              bottom: {
                x: x,
                y: top + rectRadius
              }
            }
          };
        };

        self.renderLabel = function (text) {
          var left = text.x || 0;
          self.originalElementX = left;
          var edgeStartY = text.y || 0;
          var label = self.getLabelElement({
            x: left,
            y: edgeStartY,
            text: text.text
          });
          var outputHeight = label.width();
          var currentPosition = label.height();
          var x = label.offset().left;
          var width = label.offset().left + outputHeight;
          var y = label.offset().top - $(document).scrollTop();
          var height = label.offset().top + currentPosition;
          var padding = 10;
          var _ileft = {
            x: x - padding,
            y: y + Math.round(currentPosition / 2)
          };
          var _captionMargin = {
            x: width + padding,
            y: y + Math.round(currentPosition / 2)
          };
          var tabPadding = {
            x: x + Math.round(outputHeight / 2),
            y: y - padding
          };
          var bottomBorderPosition = {
            x: x + Math.round(outputHeight / 2),
            y: height + padding
          };
          label.detach();
          setTimeout(function () {
            $('#enjoyhint_label').remove();
            label.appendTo(self.enjoyhint);
          }, self.options.animation_time / 2);
          return {
            label: label,
            left: x,
            right: width,
            top: y,
            bottom: height,
            conn: {
              left: _ileft,
              right: _captionMargin,
              top: tabPadding,
              bottom: bottomBorderPosition
            }
          };
        };

        self.renderArrow = function (to) {
          var TICK_MARGIN = to.x_from || 0;
          var startY = to.y_from || 0;
          var endpoint = to.x_to || 0;
          var curve = to.y_to || 0;
          var byTopSide = to.by_top_side;
          var shift = 0;
          var path = 0;

          if (window.innerWidth >= 640) {
            if (byTopSide) {
              if (startY >= curve) {
                path = curve;
                shift = TICK_MARGIN;
              } else {
                path = startY;
                shift = endpoint;
              }
            } else if (startY >= curve) {
              path = startY;
              shift = endpoint;
            } else {
              path = curve;
              shift = TICK_MARGIN;
            }
          }

          self.enjoyhint.addClass(self.cl.svg_transparent);
          setTimeout(function () {
            $('#enjoyhint_arrpw_line').remove();
            var denom1High = "M".concat(TICK_MARGIN, ",").concat(startY, " Q").concat(shift, ",").concat(path, " ").concat(endpoint, ",").concat(curve);
            self.$svg.append(svg('path', {
              style: 'fill:none; stroke:rgb(255,255,255); stroke-width:3',
              'marker-end': 'url(#arrowMarker)',
              d: denom1High,
              id: 'enjoyhint_arrow_line'
            }));
            self.enjoyhint.removeClass(self.cl.svg_transparent);
          }, self.options.animation_time / 2);
        };

        self.getLabelElement = function (element) {
          return $('<div>', {
            "class": 'enjoy_hint_label',
            id: 'enjoyhint_label'
          }).css({
            top: "".concat(element.y, "px"),
            left: "".concat(element.x, "px")
          }).html(element.text).appendTo(self.enjoyhint);
        };

        self.disableEventsNearRect = function (pos) {
          container.css({
            top: '0',
            left: '0'
          }).height(pos.top);
          $plusBtn.css({
            top: "".concat(pos.bottom, "px"),
            left: '0'
          });
          $minusBtn.css({
            top: '0',
            left: "".concat(0, "px")
          }).width(pos.left);
          tapTargetWave.css({
            top: '0',
            left: "".concat(pos.right, "px")
          });
        };

        $.event.special.destroyed = {
          remove: function remove(o) {
            if (o.handler) {
              o.handler();
            }
          }
        };

        self.renderLabelWithShape = function (node) {
          function remove(a) {
            if (a.tagName === 'MD-DIALOG') {
              return a;
            }

            if (typeof a.tagName === 'undefined') {
              return null;
            }

            return remove($(a).parent()[0]);
          }

          function isMediumScreen() {
            return window.innerWidth / 2 - (self.$next_btn.width() * 2 + insideWidth) * 0.58;
          }

          function computeThemeColor() {
            return window.innerWidth / 2 - self.$next_btn.width() * 0.50;
          }

          function between(x, y, num) {
            k = x;
            id = y;
            pos = num;
          }

          function update(docs, fields, context, data, timeout) {
            var callback = [];

            if (isTop) {
              callback = docs;
            } else if (isMidTop) {
              callback = fields;
            } else if (isMid) {
              callback = context;
            } else if (isMidBottom) {
              callback = data;
            } else {
              callback = timeout;
            }

            if (!callback) {
              return;
            }

            between(callback[0], callback[1], callback[2]);
          }

          self.stepData = node;
          var ehElSel = remove($(self.stepData.enjoyHintElementSelector)[0]);

          if (ehElSel != null) {
            $(ehElSel).on('dialogClosing', function () {
              self.stopFunction();
            });
          }

          self.resetComponentStuff();
          var shape = node.shape || 'rect';
          var b = {};
          var x = 0;
          var y = 0;
          var padding = {
            top: node.top || 0,
            bottom: node.bottom || 0,
            left: node.left || 0,
            right: node.right || 0
          };

          switch (shape) {
            case 'circle':
              {
                x = node.radius;
                y = node.radius;
                var position = {
                  top: node.center_y - y + padding.top,
                  bottom: node.center_y + y - padding.bottom,
                  left: node.center_x - x + padding.left,
                  right: node.center_x + x - padding.right
                };
                var newSizeX = position.right - position.left;
                var height = position.bottom - position.top;
                node.radius = Math.round(Math.min(newSizeX, height) / 2);
                x = Math.round(node.radius / 2); // noinspection JSSuspiciousNameCombination

                y = x;
                var dx = Math.round(newSizeX / 2);
                var i = Math.round(height / 2);
                node.center_x = position.left + dx;
                node.center_y = position.top + i;
                b = self.renderCircle({
                  x: node.center_x,
                  y: node.center_y,
                  r: node.radius
                });
                break;
              }

            case 'rect':
              {
                x = Math.round(node.width / 2);
                y = Math.round(node.height / 2);
                verticalPosition = {
                  top: node.center_y - y + padding.top,
                  bottom: node.center_y + y - padding.bottom,
                  left: node.center_x - x + padding.left,
                  right: node.center_x + x - padding.right
                };
                node.width = verticalPosition.right - verticalPosition.left;
                node.height = verticalPosition.bottom - verticalPosition.top;
                x = Math.round(node.width / 2);
                y = Math.round(node.height / 2);
                node.center_x = verticalPosition.left + x;
                node.center_y = verticalPosition.top + y;
                b = self.renderRect({
                  x: node.center_x,
                  y: node.center_y,
                  w: node.width,
                  h: node.height,
                  r: node.radius
                }, 0.2);
                break;
              }

            default: // noop

          }

          var region = {
            w: self.enjoyhint.width(),
            h: self.enjoyhint.height()
          };
          var $tipClone = self.getLabelElement({
            x: 0,
            y: 0,
            text: node.text
          });
          var threshold = $tipClone.outerWidth();
          var offset = $tipClone.outerHeight();
          $tipClone.remove();
          var startDayIdx = node.center_y - y;
          var endDayIdx = region.h - (node.center_y + y);
          var verticalEdge = region.h - node.center_y < node.center_y ? 'top' : 'bottom';
          var shapeRadius = 150;
          var px = 40;
          var curDayIdx = shapeRadius + offset + px;
          var verticalHeight = y + shapeRadius;
          var verticalPosition = verticalEdge === 'top' ? node.center_y - verticalHeight - offset : node.center_y + verticalHeight;
          var v = window.innerWidth / 2 - threshold / 2;

          if (startDayIdx < curDayIdx && endDayIdx < curDayIdx) {
            verticalPosition = node.center_y + px;
          }

          var a = self.renderLabel({
            x: v,
            y: verticalPosition,
            text: node.text
          });
          var insideWidth = 25;

          var _ileft = self.$skip_btn.hasClass(self.cl.hide) ? computeThemeColor() : isMediumScreen();

          var validationVM = _ileft + self.$next_btn.width() + 10;

          if (self.nextBtn === 'hide') {
            validationVM = v;
          }

          self.$next_btn.css({
            left: _ileft,
            top: verticalPosition + offset + 20
          });
          self.$skip_btn.css({
            left: validationVM + insideWidth,
            top: verticalPosition + offset + 20
          });
          self.$close_btn.css({
            right: 10,
            top: 10
          });
          self.disableEventsNearRect({
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right
          });
          var pos = false;
          var k = 'left';
          var id = 'left';
          var isCenter = a.left <= b.x && a.right >= b.x;
          var isLeft = a.right < b.x;
          var isTop = a.bottom < b.top;
          var isBottom = a.top > b.bottom;
          var isMid = a.bottom >= b.y && a.top <= b.y;
          var isMidTop = a.bottom <= b.y && !isTop;
          var isMidBottom = a.top >= b.y && !isBottom;

          if (isCenter) {
            if (isTop) {
              between('bottom', 'top', 'top');
            } else if (isBottom) {
              between('top', 'bottom', 'bottom');
            } else {
              return;
            }
          } else if (isLeft) {
            update(['right', 'top', 'top'], ['bottom', 'left', 'bottom'], ['right', 'left', 'top'], ['top', 'left', 'top'], ['right', 'bottom', 'bottom']);
          } else {
            update(['left', 'top', 'top'], ['bottom', 'right', 'bottom'], ['left', 'right', 'top'], ['top', 'right', 'top'], ['left', 'bottom', 'bottom']);
          }

          var xhair = a.conn[k];
          var deltaCoordinate = b.conn[id];
          var byTopSide = pos === 'top';
          self.renderArrow({
            x_from: xhair.x,
            y_from: xhair.y,
            x_to: window.innerWidth < 640 ? b.left + (b.left > 0) : deltaCoordinate.x,
            y_to: window.innerWidth < 640 ? b.conn.left.y : deltaCoordinate.y,
            by_top_side: byTopSide
          });
        };

        self.clear = function () {
          self.ctx.clearRect(0, 0, 3000, 2000);
        };

        return this;
      });
    },
    set: function set(val) {
      this.each(function () {
        this.enjoyhint_obj.setValue(val);
      });
      return this;
    },
    show: function show() {
      this.each(function () {
        this.enjoyhint_obj.show();
      });
      return this;
    },
    hide: function hide() {
      this.each(function () {
        this.enjoyhint_obj.hide();
      });
      return this;
    },
    hide_next: function hide_next() {
      this.each(function () {
        this.enjoyhint_obj.hideNextBtn();
      });
      return this;
    },
    show_next: function show_next() {
      this.each(function () {
        this.enjoyhint_obj.showNextBtn();
      });
      return this;
    },
    hide_skip: function hide_skip() {
      this.each(function () {
        this.enjoyhint_obj.hideSkipBtn();
      });
      return this;
    },
    show_skip: function show_skip() {
      this.each(function () {
        this.enjoyhint_obj.showSkipBtn();
      });
      return this;
    },
    render_circle: function render_circle(i, rowIndex, autounindentSize) {
      this.each(function () {
        this.enjoyhint_obj.renderCircle(i, rowIndex, autounindentSize);
      });
      return this;
    },
    render_label: function render_label(item, el, immediateAttrs) {
      this.each(function () {
        this.enjoyhint_obj.renderLabel(item, el, immediateAttrs);
      });
      return this;
    },
    render_label_with_shape: function render_label_with_shape(socket, protocolModules) {
      this.each(function () {
        self.stopFunction = protocolModules;
        this.enjoyhint_obj.renderLabelWithShape(socket);
      });
      return this;
    },
    redo_events_near_rect: function redo_events_near_rect(rValue) {
      self.disableEventsNearRect({
        top: rValue.top,
        bottom: rValue.bottom,
        left: rValue.left,
        right: rValue.right
      });
    },
    clear: function clear() {
      this.each(function () {
        this.enjoyhint_obj.clear();
      });
      return this;
    },
    close: function close() {
      this.each(function () {
        this.enjoyhint_obj.closePopdown();
      });
      return this;
    }
  };

  $.fn.enjoyhint = function (method) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (methods[method]) {
      return methods[method].apply(this, args);
    }

    if (_typeof(method) === 'object' || !method) {
      var _methods$init;

      return (_methods$init = methods.init).apply.apply(_methods$init, [this, method].concat(args));
    }

    $.error("Method ".concat(method, " does not exist on $.numinput"));
    return this;
  };
})(window.jQuery);
