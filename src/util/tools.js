/*防抖*/
export function debounce({ func, wait, immediate }) {
    let timer, result;
    let debounce = function () {
        let context = this;
        let args = arguments;
        if (immediate) {
            if (timer) clearTimeout(timer)
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timer = setTimeout(() => {
                result = func.apply(context, args)
            }, wait)
        }
        return result;
    }
    debounce.cancel = () => {
        clearTimeout(timer)
        timer = null
    }
    return debounce
}

