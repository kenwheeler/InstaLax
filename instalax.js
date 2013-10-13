var InstaLax,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

InstaLax = (function() {

  InstaLax.prototype.browserType = null;

  InstaLax.prototype.container = null;

  InstaLax.prototype.containerHeight = null;

  InstaLax.prototype.currentScroll = null;

  InstaLax.prototype.currentSlide = null;

  InstaLax.prototype.mockScroll = null;

  InstaLax.prototype.pauseLength = 0;

  InstaLax.prototype.scrollTime = null;

  InstaLax.prototype.scrollHeight = null;

  InstaLax.prototype.slides = null;

  InstaLax.prototype.slideCount = null;

  InstaLax.prototype.useHardware = null;

  InstaLax.prototype.touchObject = {
    startTouch: 0,
    stopTouch: 0,
    startTouchTime: null,
    stopTouchTime: null,
    touchArray: []
  };

  function InstaLax() {
    this.bindEvents = __bind(this.bindEvents, this);
    this.positionAndSizing = __bind(this.positionAndSizing, this);
    this.container = document.getElementById('instalax');
    this.slides = document.getElementsByClassName('slide');
    this.mockScroll = document.getElementById('scroller');
    this.slideCount = this.slides.length;
    if (document.body.style['MozTransform'] !== void 0) {
      this.browserType = 'moz';
      this.useHardware = true;
    } else if (document.body.style['webkitTransform'] !== void 0) {
      this.browserType = "webkit";
      this.useHardware = true;
    } else if (document.body.style['msTransform'] !== void 0) {
      this.browserType = "ms";
      this.useHardware = true;
    }
    this.currentSlide = 0;
    this.cssSetup();
    this.positionAndSizing();
    this.bindEvents();
    this.slideHandler();
  }

  InstaLax.prototype.cssSetup = function() {
    var slide, _i, _len, _ref, _results;
    this.container.style.position = "fixed";
    this.container.style.top = 0 + "px";
    this.container.style.left = 0 + "px";
    this.container.style.width = "100%";
    this.container.style.overflow = "hidden";
    _ref = this.slides;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      slide = _ref[_i];
      slide.style.position = "absolute";
      _results.push(slide.style.overflow = "hidden");
    }
    return _results;
  };

  InstaLax.prototype.positionAndSizing = function() {
    var bottomCalc, centerCalc, ch, currentContent, currentContentHeight, currentContentLeft, currentContentWidth, cw, el, slide, startVal, targetContent, targetSlide, topCalc, _i, _j, _k, _len, _len1, _ref, _ref1;
    this.containerHeight = document.body.clientHeight + parseInt(this.container.getAttribute('data-topoffset'));
    this.container.style.height = this.containerHeight + 'px';
    ch = this.container.offsetHeight;
    cw = this.container.offsetWidth;
    _ref = this.slides;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      slide = _ref[_i];
      slide.style.height = this.containerHeight + 'px';
    }
    this.scrollHeight = ((this.containerHeight * this.slideCount) * 2) - parseInt(this.container.getAttribute('data-topoffset'));
    this.mockScroll.style.height = this.scrollHeight + 'px';
    for (slide = _j = 0, _ref1 = this.slideCount; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; slide = 0 <= _ref1 ? ++_j : --_j) {
      targetSlide = this.slides[slide];
      targetSlide.style.zIndex = 3000 + slide;
      if (slide === 0) {
        targetSlide.style.top = 0 + 'px';
      } else {
        this.hardwareSetTop(this.slides[slide], this.containerHeight);
        if (targetSlide.getAttribute('data-fade')) {
          if (targetSlide.getAttribute('data-fade') === 'in') {
            targetSlide.style.opacity = 0;
          }
          if (targetSlide.getAttribute('data-fade') === 'out') {
            targetSlide.style.opacity = 100;
          }
        }
      }
      currentContent = targetSlide.getElementsByClassName('content');
      if (currentContent.length > 0) {
        for (_k = 0, _len1 = currentContent.length; _k < _len1; _k++) {
          el = currentContent[_k];
          targetContent = el;
          currentContentWidth = targetContent.getAttribute('data-width');
          currentContentLeft = (cw - parseInt(currentContentWidth)) / 2;
          targetContent.setAttribute('data-left', currentContentLeft);
          currentContentHeight = targetContent.offsetHeight;
          targetContent.style.width = currentContentWidth + 'px';
          topCalc = currentContentHeight * -1;
          centerCalc = (ch - currentContentHeight) / 2;
          bottomCalc = ch + currentContentHeight;
          startVal = targetContent.getAttribute('data-start');
          switch (startVal) {
            case 'top':
              this.hardwareSetTop(el, topCalc, currentContentLeft);
              break;
            case 'center':
              this.hardwareSetTop(el, centerCalc, currentContentLeft);
              break;
            case 'bottom':
              this.hardwareSetTop(el, bottomCalc, currentContentLeft);
          }
          if (targetSlide.getAttribute('data-fade')) {
            if (targetSlide.getAttribute('data-fade') === 'in') {
              targetSlide.style.opacity = 0;
            } else if (targetSlide.getAttribute('data-fade') === 'out') {
              targetSlide.style.opacity = 100;
            }
          }
        }
      }
    }
    this.currentScroll = window.pageYOffset + this.containerHeight;
    this.slideHandler();
    return this.activateScroll(window.pageYOffset);
  };

  InstaLax.prototype.bindEvents = function() {
    var _this = this;
     if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ){
      
      document.body.ontouchmove = function(evt){
        var pageY = window.pageYOffset;
        evt.preventDefault();
        _this.touchObject.touchArray.push(evt.touches[0].screenY);
        var scrollTop = pageY + (_this.touchObject.startTouch - _this.touchObject.touchArray[(_this.touchObject.touchArray.length - 1)]);
        window.scrollTo(0, (scrollTop));
      };

      document.body.ontouchstart = function(evt) {
        _this.touchObject.startTouchTime = new Date();
        _this.touchObject.startTouch = evt.touches[0].screenY;
        _this.touchObject.touchArray.push(evt.touches[0].screenY);
      };

      document.body.ontouchend = function(evt) {
        var pageY = window.pageYOffset;
        _this.touchObject.stopTouchTime = new Date();
        _this.touchObject.stopTouch = evt.changedTouches[0].screenY;
        
        // accelleration = (Math.abs(_this.touchObject.stopTouch - _this.touchObject.startTouch))/(_this.touchObject.stopTouchTime - _this.touchObject.startTouchTime).toFixed(2);
        
        // var deceleration = setInterval(function(){
        //   var pageY = window.pageYOffset;
        //   var scrollTop = pageY + (pageY * (accelleration * 1 ));
        //   window.scrollTo(0, (scrollTop));
        //   velocity = (accelleration * 0.75).toFixed(2);
        //   if(accelleration < 0.25) {
        //     clearTimeout(deceleration);
        //   }
        //   console.log(pageY + (pageY * (accelleration * 1 )));
        //   console.log(accelleration);
        // }, 300);
        
        _this.touchObject = {
          startTouch: 0,
          stopTouch: 0,
          startTouchTime: null,
          stopTouchTime: null,
          touchArray: []
        };
      };

    }

    window.addEventListener('scroll', function() {
    return _this.onScroll(window.pageYOffset);
    });

    return window.addEventListener('resize', this.positionAndSizing);
  };

  InstaLax.prototype.onScroll = function(y) {
    return this.shouldActivate(y);
  };

  InstaLax.prototype.shouldActivate = function(y) {
    var sDate, sDiff;
    sDate = +new Date();
    sDiff = sDate - this.scrollTime;
    this.scrollTime = sDate;
    if ((sDiff > 200) || (sDiff < 50)) {
      return this.activateScroll(y);
    }
  };

  InstaLax.prototype.slideHandler = function() {
    var idx, _i, _len, _ref, _results;
    _ref = this.currentSlide + 1;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      idx = _ref[_i];
      this.hardwareSetTop(this.slides[idx], 0);
      this.activateScroll(this.currentScroll);
      _results.push(this.slides[idx].style.opacity = 100);
    }
    return _results;
  };

  InstaLax.prototype.hardwareSetTop = function(el, y, x) {
    var targetEl;
    if (x == null) {
      x = 0;
    }
    if (el !== void 0) {
      targetEl = el;
      if (this.useHardware === true) {
        targetEl.style.top = 0 + 'px';
        function toArray(obj) {
          var array = [];
          for (var i = obj.length >>> 0; i--;) { 
            array[i] = obj[i];
          }
          return array;
        }
        slideArray = toArray(this.slides);
        if (this.browserType === "webkit") {
          return el.style.webkitTransform = "translate3d(" + x + "px ," + y + "px ,"+slideArray.indexOf(el)+"px)";
        } else if (this.browserType === "moz") {
          return el.style.MozTransform = "translate3d(" + x + "px ," + y + "px ,"+slideArray.indexOf(el)+"px)";
        } else if (this.browserType === "ms") {
          return el.style.msTransform = "translate3d(" + x + "px ," + y + "px ,"+slideArray.indexOf(el)+"px)";
        }
      } else {
        targetEl.style.top = y + "px";
        targetEl.style.left = x + "px";
      }
    }
  };

  InstaLax.prototype.backgroundScroll = function(el, y) {
    targetSlide = el;
    if (targetSlide.getAttribute('data-backgroundscroll')) {
      targetY = (parseFloat(targetSlide.getAttribute('data-backgroundscroll') * -1) * y)
      targetSlide.style.backgroundPosition = "0px " + targetY + "px";
    }
  };

  InstaLax.prototype.contentScroll = function(starth, midh, stoph, y) {
    var ch, currentContent, currentContentHeight, currentContentLeft, currentContentTop, currentContentWidth, currentStart, currentStop, cw, fadeValue, positionDiff, scaleRatio, scrollDiff, startPosition, stopPosition, targetContent, translated, _i, _len, _results;
    currentContent = this.slides[parseInt(this.currentSlide)].getElementsByClassName('content');
    if (currentContent.length > 0) {
      _results = [];
      for (_i = 0, _len = currentContent.length; _i < _len; _i++) {
        targetContent = currentContent[_i];
        currentStart = targetContent.getAttribute('data-start');
        currentStop = targetContent.getAttribute('data-stop');
        ch = this.container.offsetHeight;
        cw = this.container.offsetWidth;
        currentContentWidth = targetContent.getAttribute('data-width');
        currentContentLeft = (cw - parseInt(currentContentWidth)) / 2;
        targetContent.setAttribute('data-left', currentContentLeft);
        currentContentHeight = targetContent.offsetHeight;
        switch (currentStart) {
          case 'top':
            startPosition = currentContentHeight * -1;
            break;
          case 'center':
            startPosition = (ch - currentContentHeight) / 2;
            break;
          case 'bottom':
            startPosition = ch;
        }
        switch (currentStop) {
          case 'top':
            stopPosition = currentContentHeight * -1;
            break;
          case 'center':
            stopPosition = (ch - currentContentHeight) / 2;
            break;
          case 'bottom':
            stopPosition = ch;
        }
        if (y <= stoph) {
          positionDiff = Math.abs(stopPosition - startPosition);
          scrollDiff = Math.abs(midh - starth);
          scaleRatio = scrollDiff / positionDiff;
          translated = (midh - y) / scaleRatio;
          if (startPosition < stopPosition) {
            currentContentTop = stopPosition - translated;
          } else {
            currentContentTop = stopPosition + translated;
          }
          if (y >= midh) {
            currentContentTop = stopPosition;
          }
          if (y <= starth) {
            currentContentTop = startPosition;
          }
          this.hardwareSetTop(targetContent, currentContentTop, currentContentLeft);
          if (targetContent.getAttribute('data-fade')) {
            if (targetContent.getAttribute('data-fade') === 'in') {
              fadeValue = ((y - starth) / (starth - midh)).toFixed(2) * -1;
              _results.push(targetContent.style.opacity = fadeValue);
            } else if (targetContent.getAttribute('data-fade') === 'out') {
              fadeValue = ((y - midh) / (midh - starth)).toFixed(2) * -1;
              _results.push(targetContent.style.opacity = fadeValue);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  InstaLax.prototype.checkFade = function(el, opVal) {
    if (el.getAttribute('data-fade')) {
      return el.style.opacity = opVal;
    }
  };

  InstaLax.prototype.activateScroll = function(y) {
    var adjustedTopValue, fadeValue, midHeight, startHeight, stopHeight, targetSlide;
    this.currentScroll = y + this.containerHeight;
    startHeight = this.currentSlide * (this.containerHeight * 2);
    midHeight = startHeight + this.containerHeight;
    stopHeight = startHeight + (this.containerHeight * 2);
    adjustedTopValue = (this.currentScroll - midHeight) * -1;
    fadeValue = ((this.currentScroll - startHeight) / (midHeight - startHeight)).toFixed(2);
    targetSlide = this.slides[parseInt(this.currentSlide)];
    if (this.currentScroll < this.scrollHeight) {
      this.contentScroll(startHeight, midHeight, stopHeight, y);
      if (this.currentScroll >= (stopHeight)) {
        this.hardwareSetTop(this.slides[parseInt(this.currentSlide)], 0);
        this.backgroundScroll(targetSlide, (0));
        this.checkFade(targetSlide, 100);
        if (this.slides[this.currentSlide + 1]) {
          this.currentSlide++;
        }
      } else if (this.currentScroll <= (startHeight)) {
        if (this.currentSlide !== 0) {
          this.hardwareSetTop(this.slides[parseInt(this.currentSlide)], this.containerHeight);
          this.backgroundScroll(targetSlide, (this.containerHeight));
          this.checkFade(targetSlide, 0);
          this.currentSlide--;
        }
      } else {
        if (adjustedTopValue >= 0) {
          if (targetSlide.getAttribute('data-noslide')) {
            this.hardwareSetTop(this.slides[parseInt(this.currentSlide)], 0);
            this.backgroundScroll(targetSlide, (0));
            this.checkFade(targetSlide, fadeValue);
          } else {
            this.hardwareSetTop(this.slides[parseInt(this.currentSlide)], adjustedTopValue);
            this.backgroundScroll(targetSlide, (adjustedTopValue));
            this.checkFade(targetSlide, fadeValue);
          }
        } else if (adjustedTopValue > (this.containerHeight - 25)) {
          this.hardwareSetTop(this.slides[parseInt(this.currentSlide)], this.containerHeight);
          this.backgroundScroll(targetSlide, (this.containerHeight));
          this.checkFade(targetSlide, 0);
        } else if (adjustedTopValue <  (25)) {
          this.hardwareSetTop(this.slides[parseInt(this.currentSlide)], 0);
          this.backgroundScroll(targetSlide, (0));
          this.checkFade(targetSlide, 100);
        }
      }
    }
  };

  return InstaLax;

  })();