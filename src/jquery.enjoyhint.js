CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  let effectiveRad = r;

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
  let self;

  const methods = {
    init(settings) {
      return this.each(function () {
        function svg(type, params) {
          const el = document.createElementNS('http://www.w3.org/2000/svg', type);

          Object.keys(params).forEach(p => el.setAttribute(p, params[p]));

          return el;
        }

        const fn = {
          onNextClick() {
          },
          onSkipClick() {
          },
          animation_time: 800,
        };

        this.enjoyhint_obj = {};

        self = this.enjoyhint_obj;

        self.resetComponentStuff = function () {
        };

        const layersLi = $(this);

        self.options = jQuery.extend(fn, settings);

        self.gcl = {
          chooser: 'enjoyhint',
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
          kinetic_container: 'kinetic_container',
        };

        self.canvas_size = {
          w: $(window).width() * 1.4,
          h: $(window).height() * 1.4,
        };

        const canvasId = 'enj_canvas';

        self.enjoyhint = $('<div>', {
          class: `${self.cl.enjoy_hint} ${self.cl.svg_transparent}`,
        }).appendTo(layersLi);

        self.enjoyhint_svg_wrapper = $('<div>', {
          class: `${self.cl.svg_wrapper} ${self.cl.svg_transparent}`,
        }).appendTo(self.enjoyhint);

        self.$stage_container = $(`<div id="${self.cl.kinetic_container}">`).appendTo(self.enjoyhint);

        self.$canvas = $(`<canvas id="${canvasId}" width="${self.canvas_size.w}" height="${self.canvas_size.h}" ` +
          `class="${self.cl.main_canvas}">`).appendTo(self.enjoyhint);

        self.$svg = $(`<svg width="${self.canvas_size.w}" height="${self.canvas_size.h}" ` +
          `class="${self.cl.main_canvas} ${self.cl.main_svg}">`).appendTo(self.enjoyhint_svg_wrapper);

        const metaElement = $(svg('defs'));
        const el = $(svg('marker', {
          id: 'arrowMarker',
          viewBox: '0 0 36 21',
          refX: '21',
          refY: '10',
          markerUnits: 'strokeWidth',
          orient: 'auto',
          markerWidth: '16',
          markerHeight: '12',
        }));
        const poster = $(svg('path', {
          style: 'fill:none; stroke:rgb(255,255,255); stroke-width:2',
          d: 'M0,0 c30,11 30,9 0,20',
        }));

        metaElement.append(el.append(poster)).appendTo(self.$svg);

        self.kinetic_stage = new Kinetic.Stage({
          container: self.cl.kinetic_container,
          width: self.canvas_size.w,
          height: self.canvas_size.h,
          scaleX: 1,
        });

        self.layer = new Kinetic.Layer();

        self.rect = new Kinetic.Rect({
          fill: 'rgba(0,0,0,0.8)',
          width: self.canvas_size.w,
          height: self.canvas_size.h,
        });

        const container = $('<div>', {
          class: self.cl.disable_events_element,
        }).appendTo(self.enjoyhint);

        const $plusBtn = container.clone().appendTo(self.enjoyhint);
        const $minusBtn = container.clone().appendTo(self.enjoyhint);
        const tapTargetWave = container.clone().appendTo(self.enjoyhint);

        const click = function (event) {
          event.stopImmediatePropagation();
        };

        $('button').focusout(click);

        container.click(click);
        $plusBtn.click(click);
        $minusBtn.click(click);
        tapTargetWave.click(click);

        self.$skip_btn = $('<div>', {
          class: self.cl.skip_btn,
        }).appendTo(self.enjoyhint).html('Skip').click(() => {
          self.hide();
          self.options.onSkipClick();
        });

        self.$next_btn = $('<div>', {
          class: self.cl.next_btn,
        }).appendTo(self.enjoyhint).html('Next').click(() => {
          self.options.onNextClick();
        });

        self.$close_btn = $('<div>', {
          class: self.cl.close_btn,
        }).appendTo(self.enjoyhint).html('').click(() => {
          self.hide();
          self.options.onSkipClick();
        });

        self.$canvas.mousedown((event) => {
          const canvas = $('canvas');

          canvas.css({
            left: '4000px',
          });

          const clearAllItem = document.elementFromPoint(event.clientX, event.clientY);

          canvas.css({
            left: '0px',
          });
          $(clearAllItem).click();
          return false;
        });

        const radius = 0;
        const shapeInitShift = 130;

        self.shape = new Kinetic.Shape({
          radius,
          center_x: -shapeInitShift,
          center_y: -shapeInitShift,
          width: 0,
          height: 0,
          sceneFunc() {
            const ctx = this.getContext('2d')._context;
            const compositeOperation = ctx.globalCompositeOperation;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();

            const width = this.attrs.center_x - Math.round(this.attrs.width / 2);
            const y = this.attrs.center_y - Math.round(this.attrs.height / 2);

            ctx.roundRect(width, y, this.attrs.width, this.attrs.height, this.attrs.radius);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.globalCompositeOperation = compositeOperation;
          },
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
          const explosionSprite = new Kinetic.Tween({
            node: self.shape,
            duration: 0.002,
            center_x: -shapeInitShift,
            center_y: -shapeInitShift,
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
          const cirRadius = size.r || 0;
          const vx1 = size.x || 0;
          const vy1 = size.y || 0;
          const explosionSprite = new Kinetic.Tween({
            node: self.shape,
            duration: 0.2,
            center_x: vx1,
            center_y: vy1,
            width: cirRadius * 2,
            height: cirRadius * 2,
            radius: cirRadius,
          });

          explosionSprite.play();

          const x = vx1 - cirRadius;
          const width = vx1 + cirRadius;
          const y = vy1 - cirRadius;
          const height = vy1 + cirRadius;
          const padding = 20;

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
                y: vy1,
              },
              right: {
                x: width + padding,
                y: vy1,
              },
              top: {
                x: vx1,
                y: y - padding,
              },
              bottom: {
                x: vx1,
                y: height + padding,
              },
            },
          };
        };

        self.renderRect = function (props, duration) {
          const currentRadius = props.r || 0;
          const x = props.x || 0;
          const y = props.y || 0;
          const focusAreaSize = props.w || 0;
          const maskHeight = props.h || 0;
          const rectRadius = 20;
          const explosionSprite = new Kinetic.Tween({
            node: self.shape,
            duration,
            center_x: x,
            center_y: y,
            width: focusAreaSize,
            height: maskHeight,
            radius: currentRadius,
          });

          explosionSprite.play();

          const markerSize = Math.round(focusAreaSize / 2);
          const midHeight = Math.round(maskHeight / 2);
          const x1 = x - markerSize;
          const padding = x + markerSize;
          const ypos = y - midHeight;
          const top = y + midHeight;

          return {
            x,
            y,
            left: x1,
            right: padding,
            top: ypos,
            bottom: top,
            conn: {
              left: {
                x: x1 - rectRadius,
                y,
              },
              right: {
                x: padding + rectRadius,
                y,
              },
              top: {
                x,
                y: ypos - rectRadius,
              },
              bottom: {
                x,
                y: top + rectRadius,
              },
            },
          };
        };

        self.renderLabel = function (text) {
          const left = text.x || 0;

          self.originalElementX = left;

          const edgeStartY = text.y || 0;
          const label = self.getLabelElement({
            x: left,
            y: edgeStartY,
            text: text.text,
          });
          const outputHeight = label.width();
          const currentPosition = label.height();
          const x = label.offset().left;
          const width = label.offset().left + outputHeight;
          const y = label.offset().top - $(document).scrollTop();
          const height = label.offset().top + currentPosition;
          const padding = 10;

          const _ileft = {
            x: x - padding,
            y: y + Math.round(currentPosition / 2),
          };

          const _captionMargin = {
            x: width + padding,
            y: y + Math.round(currentPosition / 2),
          };

          const tabPadding = {
            x: x + Math.round(outputHeight / 2),
            y: y - padding,
          };

          const bottomBorderPosition = {
            x: x + Math.round(outputHeight / 2),
            y: height + padding,
          };

          label.detach();

          setTimeout(() => {
            $('#enjoyhint_label').remove();
            label.appendTo(self.enjoyhint);
          }, self.options.animation_time / 2);

          return {
            label,
            left: x,
            right: width,
            top: y,
            bottom: height,
            conn: {
              left: _ileft,
              right: _captionMargin,
              top: tabPadding,
              bottom: bottomBorderPosition,
            },
          };
        };

        self.renderArrow = function (to) {
          const TICK_MARGIN = to.x_from || 0;
          const startY = to.y_from || 0;
          const endpoint = to.x_to || 0;
          const curve = to.y_to || 0;
          const byTopSide = to.by_top_side;

          let shift = 0;
          let path = 0;

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

          setTimeout(() => {
            $('#enjoyhint_arrpw_line').remove();
            const denom1High = `M${TICK_MARGIN},${startY} Q${shift},${path} ${endpoint},${curve}`;
            self.$svg.append(svg('path', {
              style: 'fill:none; stroke:rgb(255,255,255); stroke-width:3',
              'marker-end': 'url(#arrowMarker)',
              d: denom1High,
              id: 'enjoyhint_arrow_line',
            }));
            self.enjoyhint.removeClass(self.cl.svg_transparent);
          }, self.options.animation_time / 2);
        };

        self.getLabelElement = function (element) {
          return $('<div>', {
            class: 'enjoy_hint_label',
            id: 'enjoyhint_label',
          }).css({
            top: `${element.y}px`,
            left: `${element.x}px`,
          }).html(element.text).appendTo(self.enjoyhint);
        };

        self.disableEventsNearRect = function (pos) {
          container.css({
            top: '0',
            left: '0',
          }).height(pos.top);
          $plusBtn.css({
            top: `${pos.bottom}px`,
            left: '0',
          });
          $minusBtn.css({
            top: '0',
            left: `${0}px`,
          }).width(pos.left);
          tapTargetWave.css({
            top: '0',
            left: `${pos.right}px`,
          });
        };

        $.event.special.destroyed = {
          remove(o) {
            if (o.handler) {
              o.handler();
            }
          },
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
            let callback = [];

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

          const ehElSel = remove($(self.stepData.enjoyHintElementSelector)[0]);

          if (ehElSel != null) {
            $(ehElSel).on('dialogClosing', () => {
              self.stopFunction();
            });
          }

          self.resetComponentStuff();

          const shape = node.shape || 'rect';

          let b = {};
          let x = 0;
          let y = 0;

          const padding = {
            top: node.top || 0,
            bottom: node.bottom || 0,
            left: node.left || 0,
            right: node.right || 0,
          };

          switch (shape) {
            case 'circle': {
              x = node.radius;
              y = node.radius;

              const position = {
                top: node.center_y - y + padding.top,
                bottom: node.center_y + y - padding.bottom,
                left: node.center_x - x + padding.left,
                right: node.center_x + x - padding.right,
              };

              const newSizeX = position.right - position.left;
              const height = position.bottom - position.top;

              node.radius = Math.round(Math.min(newSizeX, height) / 2);

              x = Math.round(node.radius / 2);
              // noinspection JSSuspiciousNameCombination
              y = x;

              const dx = Math.round(newSizeX / 2);
              const i = Math.round(height / 2);

              node.center_x = position.left + dx;
              node.center_y = position.top + i;

              b = self.renderCircle({
                x: node.center_x,
                y: node.center_y,
                r: node.radius,
              });

              break;
            }
            case 'rect': {
              x = Math.round(node.width / 2);
              y = Math.round(node.height / 2);

              verticalPosition = {
                top: node.center_y - y + padding.top,
                bottom: node.center_y + y - padding.bottom,
                left: node.center_x - x + padding.left,
                right: node.center_x + x - padding.right,
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
                r: node.radius,
              }, 0.2);

              break;
            }
            default:
            // noop
          }

          const region = {
            w: self.enjoyhint.width(),
            h: self.enjoyhint.height(),
          };

          const $tipClone = self.getLabelElement({
            x: 0,
            y: 0,
            text: node.text,
          });

          const threshold = $tipClone.outerWidth();
          const offset = $tipClone.outerHeight();

          $tipClone.remove();

          const startDayIdx = node.center_y - y;
          const endDayIdx = region.h - (node.center_y + y);
          const verticalEdge = region.h - node.center_y < node.center_y ? 'top' : 'bottom';
          const shapeRadius = 150;
          const px = 40;
          const curDayIdx = shapeRadius + offset + px;
          const verticalHeight = y + shapeRadius;

          let verticalPosition = verticalEdge === 'top' ? node.center_y - verticalHeight - offset :
            node.center_y + verticalHeight;

          const v = window.innerWidth / 2 - threshold / 2;

          if (startDayIdx < curDayIdx && endDayIdx < curDayIdx) {
            verticalPosition = node.center_y + px;
          }

          const a = self.renderLabel({
            x: v,
            y: verticalPosition,
            text: node.text,
          });

          const insideWidth = 25;
          const _ileft = self.$skip_btn.hasClass(self.cl.hide) ? computeThemeColor() : isMediumScreen();

          let validationVM = _ileft + self.$next_btn.width() + 10;

          if (self.nextBtn === 'hide') {
            validationVM = v;
          }

          self.$next_btn.css({
            left: _ileft,
            top: verticalPosition + offset + 20,
          });

          self.$skip_btn.css({
            left: validationVM + insideWidth,
            top: verticalPosition + offset + 20,
          });

          self.$close_btn.css({
            right: 10,
            top: 10,
          });

          self.disableEventsNearRect({
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
          });

          let pos = false;
          let k = 'left';
          let id = 'left';

          const isCenter = a.left <= b.x && a.right >= b.x;
          const isLeft = a.right < b.x;
          const isTop = a.bottom < b.top;
          const isBottom = a.top > b.bottom;
          const isMid = a.bottom >= b.y && a.top <= b.y;
          const isMidTop = a.bottom <= b.y && !isTop;
          const isMidBottom = a.top >= b.y && !isBottom;

          if (isCenter) {
            if (isTop) {
              between('bottom', 'top', 'top');
            } else if (isBottom) {
              between('top', 'bottom', 'bottom');
            } else {
              return;
            }
          } else if (isLeft) {
            update(
              ['right', 'top', 'top'],
              ['bottom', 'left', 'bottom'],
              ['right', 'left', 'top'],
              ['top', 'left', 'top'],
              ['right', 'bottom', 'bottom'],
            );
          } else {
            update(
              ['left', 'top', 'top'],
              ['bottom', 'right', 'bottom'],
              ['left', 'right', 'top'],
              ['top', 'right', 'top'],
              ['left', 'bottom', 'bottom'],
            );
          }

          const xhair = a.conn[k];
          const deltaCoordinate = b.conn[id];
          const byTopSide = pos === 'top';

          self.renderArrow({
            x_from: xhair.x,
            y_from: xhair.y,
            x_to: window.innerWidth < 640 ? b.left + (b.left > 0) : deltaCoordinate.x,
            y_to: window.innerWidth < 640 ? b.conn.left.y : deltaCoordinate.y,
            by_top_side: byTopSide,
          });
        };

        self.clear = function () {
          self.ctx.clearRect(0, 0, 3000, 2000);
        };

        return this;
      });
    },
    set(val) {
      this.each(function () {
        this.enjoyhint_obj.setValue(val);
      });
      return this;
    },
    show() {
      this.each(function () {
        this.enjoyhint_obj.show();
      });
      return this;
    },
    hide() {
      this.each(function () {
        this.enjoyhint_obj.hide();
      });
      return this;
    },
    hide_next() {
      this.each(function () {
        this.enjoyhint_obj.hideNextBtn();
      });
      return this;
    },
    show_next() {
      this.each(function () {
        this.enjoyhint_obj.showNextBtn();
      });
      return this;
    },
    hide_skip() {
      this.each(function () {
        this.enjoyhint_obj.hideSkipBtn();
      });
      return this;
    },
    show_skip() {
      this.each(function () {
        this.enjoyhint_obj.showSkipBtn();
      });
      return this;
    },
    render_circle(i, rowIndex, autounindentSize) {
      this.each(function () {
        this.enjoyhint_obj.renderCircle(i, rowIndex, autounindentSize);
      });
      return this;
    },
    render_label(item, el, immediateAttrs) {
      this.each(function () {
        this.enjoyhint_obj.renderLabel(item, el, immediateAttrs);
      });
      return this;
    },
    render_label_with_shape(socket, protocolModules) {
      this.each(function () {
        self.stopFunction = protocolModules;
        this.enjoyhint_obj.renderLabelWithShape(socket);
      });
      return this;
    },
    redo_events_near_rect(rValue) {
      self.disableEventsNearRect({
        top: rValue.top,
        bottom: rValue.bottom,
        left: rValue.left,
        right: rValue.right,
      });
    },
    clear() {
      this.each(function () {
        this.enjoyhint_obj.clear();
      });
      return this;
    },
    close() {
      this.each(function () {
        this.enjoyhint_obj.closePopdown();
      });
      return this;
    },
  };
  $.fn.enjoyhint = function (method, ...args) {
    if (methods[method]) {
      return methods[method].apply(this, args);
    }
    if (typeof method === 'object' || !method) {
      return methods.init.apply(this, method, ...args);
    }
    $.error(`Method ${method} does not exist on $.numinput`);
    return this;
  };
}(window.jQuery));
