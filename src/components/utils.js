

const Utils = {
  debounce: function(f, delay) {
    let timer = null; 

    return function(...args) {
      const onComplete = () => {
        f.apply(this, args)
        timer = null
      }

      if(timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(onComplete, delay)
    }
  },
}

export default Utils