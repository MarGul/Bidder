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