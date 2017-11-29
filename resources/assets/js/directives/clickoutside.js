import Vue from 'vue'

Vue.directive('click-outside', {
    bind(el, binding, vnode) {
        const handler = (e) => {
            if (!vnode.context || el.contains(e.target)) return

            binding.value(e)
        }

        el.ClickOutside = handler
        document.addEventListener('click', handler)
    },

    update(el, binding) {
        el.ClickOutside = binding.value
    },

    unbind(el) {
        document.removeEventListener('click', el.ClickOutside)
        delete el.ClickOutside
    }
});

/**

import Vue from 'vue'

Vue.directive('click-outside', {
    bind(element, binding, vnode) {
        const handler = (event) => {
            if (!vnode.context || element.contains(event.target)) return

            element.clickOutside.callback(event)
        }

        element.clickOutside = {
            handler: handler,
            callback: binding.value
        }

        document.addEventListener('click', handler)
    },

    update(element, binding) {
        element.clickOutside.callback = binding.value
    },

    unbind(element) {
        document.removeEventListener('click', element.clickOutside.handler)
        delete element.clickOutside
    }
})
 */