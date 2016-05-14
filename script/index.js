(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueNotice = factory());
}(this, function () { 'use strict';

  var baseStyle = {
    position: 'fixed',
    zIndex: '9999',
    top: '0',
    right: '10px',
    left: '10px',
    padding: '8px 16px',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    background: 'white',
    textAlign: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 12px 4px',
    opacity: '0',
    transition: 'opacity 0.5s'
  }

  var successStyle = {
    background: '#A5D6A7',
    color: '#1B5E20'
  }

  var infoStyle = {
    background: '#90CAF9',
    color: '#0D47A1'
  }

  var warningStyle = {
    background: '#FFF59D',
    color: '#F57F17'
  }

  var errorStyle = {
    background: '#F48FB1',
    color: '#880E4F'
  }

  function applyStyle (el, styleObj) {
    for (var style in styleObj) {
      if (styleObj.hasOwnProperty(style)) {
        el.style[style] = styleObj[style]
      }
    }
  }

	function applyTheme (el, name) {
		switch (name) {
			case 'success':
				applyStyle(el, successStyle)
				break;
			case 'info':
				applyStyle(el, infoStyle)
				break;
			case 'warning':
				applyStyle(el, warningStyle)
				break;
			case 'error':
				applyStyle(el, errorStyle)
				break;
		}
	}

  function Notice (content, options) {
    this.div = document.createElement('div')
    this.div.innerHTML = content
    applyStyle(this.div, baseStyle)

    // options
    var duration = 5000

    if (options !== undefined) {
      if (typeof options === 'object') {
        duration = options.duration ? options.duration : duration
				if (typeof options.style === 'object') {
					applyStyle(this.div, options.style)
				} else if (typeof options.style === 'string') {
					applyTheme(this.div, options.style)
				}
      }
      if (typeof options === 'string') {
				applyTheme(this.div, options)
      }
    }

    document.body.appendChild(this.div)

		// if set opacity sync, the transition will be ignored
    setTimeout((function () {
      this.div.style.opacity = '1'
    }).bind(this), 0)

    setTimeout((function () {
      this.div.style.opacity = '0'
      setTimeout((function () {
        document.body.removeChild(this.div)
      }).bind(this), 500)
    }).bind(this), duration)
  }

  return {
		install: function (Vue, options) {
	    Vue.prototype.$notice = function (content, options) {
	      new Notice(content, options)
	    }
	  }
	}

}));
