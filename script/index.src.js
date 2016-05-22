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
  transition: 'opacity 0.5s'
}

var hideStyle = {
  opacity: '0'
}

var showStyle = {
  opacity: '1'
}

var themes = {
  success: {
    background: '#A5D6A7',
    color: '#1B5E20'
  },

  info: {
    background: '#90CAF9',
    color: '#0D47A1'
  },

  warning: {
    background: '#FFF59D',
    color: '#F57F17'
  },

  error: {
    background: '#F48FB1',
    color: '#880E4F'
  }
}

var duration = 5000

function applyStyle (el, styleObj) {
  for (var style in styleObj) {
    if (styleObj.hasOwnProperty(style)) {
      el.style[style] = styleObj[style]
    }
  }
}

function applyTheme (el, name) {
  if (themes[name]) {
    applyStyle(el, themes[name])
  }
}

function Notice (content, options) {
  this.div = document.createElement('div')
  this.div.innerHTML = content
  applyStyle(this.div, baseStyle)
  applyStyle(this.div, hideStyle)
  var curDuration = duration

  // options
  if (options !== undefined) {
    if (typeof options === 'object') {
      if (typeof options.duration === 'number') {
        curDuration = options.duration
      }
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

  // make sure brower has render style above
  window.getComputedStyle(this.div).opacity
  applyStyle(this.div, showStyle)

  setTimeout((function () {
    applyStyle(this.div, hideStyle)
    setTimeout((function () {
      document.body.removeChild(this.div)
    }).bind(this), 500)
  }).bind(this), curDuration)
}

export default {
  install: function (Vue, options) {
    // apply global customized duration
    if (options) {
      if (typeof options.duration === 'number') {
        duration = options.duration
      }

      // apply global customized style
      if (typeof options.style === 'object') {
        for (var style in options.style) {
          if (options.style.hasOwnProperty(style)) {
            baseStyle[style] = options.style[style]
          }
        }
      }

      // apply global customized themes
      // the customized theme will override default theme
      if (typeof options.themes === 'object') {
        for (var theme in options.themes) {
          if (options.themes.hasOwnProperty(theme)) {
            themes[theme] = options.themes[theme]
          }
        }
      }
    }

    // inject $notice into Vue instance
    Vue.prototype.$notice = function (content, options) {
      new Notice(content, options)
    }
  }
}
