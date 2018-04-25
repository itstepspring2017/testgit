//Р”Р»СЏ IE8
(function () {
    if (!(Element.prototype.addEventListener)) {
        Element.prototype.addEventListener = function (evname, handle) {
            this.attachEvent(evname, handele);
        };
        Element.prototype.removeEventListener = function (evname, handle) {
            this.detachEvent(evname, handle);
        };
    }
})();

//.......
//РџР»Р°РІРЅР°СЏ РїСЂРѕРєСЂСѓС‚РєР° Рє РµР»РµРјРµРЅС‚Сѓ
(function () {
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }

    function getScrollHeight() {
        return document.documentElement.scrollHeight || document.body.scrollHeight;
    }

    Element.prototype.scrollByAhref = function (time) {
        var rect = this.getBoundingClientRect();
        var direction = rect.top > 0 ? 1 : -1;
        var stCount = time * 25 / 1000;


        var step = Math.abs(rect.top) / stCount;

        function isEndScroll() {
            return (direction == -1 && getScrollTop() == 0) || (direction == 1 && getScrollTop() >= (getScrollHeight() - window.innerHeight))
        }

        var isInView = function () {
            return Math.abs(this.getBoundingClientRect().top) < step;
        }.bind(this);

        var timer = setInterval(function () {
            if (isEndScroll() || isInView()) {
                window.scrollBy(0, this.getBoundingClientRect().top)
                console.log("stop")
                clearInterval(timer);
                return;
            }
            window.scrollBy(0, step * direction)

        }.bind(this), 40)

    };
})();
//.................................................................................................................
//РїРѕР»РёС„РёР» . РѕРїСЂРµРґРµР»СЏРµС‚ РІС‹СЃРѕС‚Сѓ Р±Р»РѕРєР°
(function () {
    Element.prototype.getHeight = function (display) {
        display = display || '';
        var old = this.style.display;
        this.style.display = 'display';
        var h = getComputedStyle(this).height;
        this.style.display = old;
        return parseInt(h) || 0;
    };
    Element.prototype.getWidth = function (display) {
        display = display || '';
        var old = this.style.display;
        this.style.display = 'display';
        var h = getComputedStyle(this).width;
        this.style.display = old;
        return parseInt(h) || 0;
    };
})();

//....................

//РџРѕР»РёС„РёР» РїСЂРѕР·СЂР°С‡РЅРѕСЃС‚Рё fadeOut
(function () {
    Element.prototype.fadeOut = function (time, onEnd) {
        var stCount = time * 25 / 1000;
        var op = getComputedStyle(this).opacity;
        var step = op / stCount;

        var timer = setInterval(function () {
            op -= step;
            if (op <= 0) {
                clearInterval(timer);
                this.style.display = 'none';
                this.style.opacity = '';
                if (onEnd) onEnd();
                return;
            }
            this.style.opacity = op;
        }.bind(this), 40);
        return this;
    };
    Element.prototype.fadeIn = function (time, onEnd) {
        var stCount = time * 25 / 1000;
        var op = getComputedStyle(this).opacity;
        var step = op / stCount;
        var val = 0;

        this.style.display = '';
        this.style.opacity = val;

        var timer = setInterval(function () {
            val += step;
            if (val >= op) {
                clearInterval(timer);

                this.style.opacity = '';
                if (onEnd) onEnd();
                return;
            }
            this.style.opacity = val;
        }.bind(this), 40);
        return this;
    };
    Element.prototype.fadeToggle = function (time, onEnd) {
        this.style.display == 'none' ? this.fadeIn(time, onEnd) : this.fadeOut(time, onEnd);
    };
})();

//...............

//polyfill getScc value
(function () {
    Element.prototype.getStyleValue = function (prop) {
        var old = this.style[prop];
        this.style[prop] = '';
        var value = getComputedStyle(this)[prop];
        this.style[prop] = old;
        return value;
    };
})();

//..................

//polyfill Slide UP Down
(function () {
    Element.prototype.slideUp = function (time, onEnd) {
        var stCount = time * 25 / 1000;
        var h = this.getHeight();


        var padTop = parseInt(getComputedStyle(this).paddingTop);
        var padBot = parseInt(getComputedStyle(this).paddingBottom);

        var step = h / stCount;
        var stepTop=padTop/stCount;
        var stepBot=padBot/stCount;

        this.style.overflow = 'hidden';

        var timer = setInterval(function () {
            h -= step;
            padTop-=stepTop;
            padBot-=stepBot;
            if (h <= 0) {
                clearInterval(timer);
                this.style.display = 'none';
                this.style.overflow = '';
                this.style.height = '';
                if (onEnd) onEnd();
                return;
            }
            this.style.height = h + 'px';
            this.style.paddingTop = padTop + 'px';
            this.style.paddingBottom = padBot + 'px';
        }.bind(this), 40);
        return this;

    };
    Element.prototype.slideDown=function (time, onEnd) {
        var stCount = time * 25 / 1000;
        var defDisplay=this.getStyleValue('display');
        this.style.display=defDisplay;
        var h = this.getHeight(defDisplay);


        var padTop = parseInt(getComputedStyle(this).paddingTop);
        var padBot = parseInt(getComputedStyle(this).paddingBottom);

        var step = h / stCount;
        var stepTop=padTop/stCount;
        var stepBot=padBot/stCount;

        this.style.overflow = 'hidden';

        var currentHeight=0;
        var currentPadTop=0;
        var currentPadBot=0;
        this.style.height = currentHeight + 'px';
        this.style.paddingTop = currentPadTop + 'px';
        this.style.paddingBottom = currentPadBot + 'px';

        var timer = setInterval(function () {
            currentHeight += step;
            currentPadTop+=stepTop;
            currentPadBot+=stepBot;
            if (currentHeight >= h) {
                clearInterval(timer);
                this.style.display = '';
                this.style.overflow = '';
                this.style.height = '';
                this.style.boxSizing = '';
                if (onEnd) onEnd();
                return;
            }
            this.style.height = currentHeight + 'px';
            this.style.paddingTop = currentPadTop + 'px';
            this.style.paddingBottom = currentPadBot + 'px';
        }.bind(this), 40);
        return this;


    };
    Element.prototype.slideDownUpToggle=function (time, onEnd) {
        this.style.display == 'none' ? this.slideDown(time, onEnd) : this.slideUp(time, onEnd);
    };
})();

//..................

//slideLeft_Right
(function () {
    Element.prototype.slideLeft = function (time, onEnd) {
        var stCount = time * 25 / 1000;
        var w = this.getWidth();


        var padLef = parseInt(getComputedStyle(this).paddingLeft);
        var padRig = parseInt(getComputedStyle(this).paddingRight);

        var step = w / stCount;
        var stepTop=padLef/stCount;
        var stepBot=padRig/stCount;

        this.style.overflow = 'hidden';

        var timer = setInterval(function () {
            w -= step;
            padLef-=stepTop;
            padRig-=stepBot;
            if (w <= 0) {
                clearInterval(timer);
                this.style.display = 'none';
                this.style.overflow = '';
                this.style.width = '';
                if (onEnd) onEnd();
                return;
            }
            this.style.width = w + 'px';
            this.style.paddingLeft = padLef + 'px';
            this.style.paddingRight = padRig + 'px';
        }.bind(this), 40);
        return this;

    };
    Element.prototype.slideRight=function (time, onEnd) {
        var stCount = time * 25 / 1000;
        var defDisplay=this.getStyleValue('display');
        this.style.display='';
        var w = this.getWidth(defDisplay);


        var padLef = parseInt(getComputedStyle(this).paddingLeft);
        var padRig = parseInt(getComputedStyle(this).paddingRight);

        var step = w / stCount;
        var stepLef=padLef/stCount;
        var stepRig=padRig/stCount;

        this.style.overflow = 'hidden';

        var currentWidth=0;
        var currentPadLef=0;
        var currentPadRig=0;
        this.style.width = currentWidth + 'px';
        this.style.paddingLeft = currentPadLef + 'px';
        this.style.paddingRight = currentPadRig + 'px';

        var timer = setInterval(function () {
            currentWidth += step;
            currentPadLef+=stepLef;
            currentPadLef+=stepRig;
            if (currentWidth >= w) {
                clearInterval(timer);
                this.style.display = '';
                this.style.overflow = '';
                this.style.width = '';
                this.style.boxSizing = '';
                if (onEnd) onEnd();
                return;
            }
            this.style.width = currentWidth + 'px';
            this.style.paddingLeft = currentPadLef + 'px';
            this.style.paddingRight = currentPadRig + 'px';
        }.bind(this), 40);
        return this;


    };
    Element.prototype.slideLeftRightToggle=function (time, onEnd) {
        this.style.display == 'none' ? this.slideRight(time, onEnd) : this.slideLeft(time, onEnd);
    };
})();
//....................

//MycomputedStyle
Object.defineProperty(Element.prototype,"myComputedStyle",{
    get:function(){
        return getComputedStyle(this);
    },
    set:function(obj){
        for(k in obj){
            this.style[k]=obj[k]
        }
    }
});
//...............