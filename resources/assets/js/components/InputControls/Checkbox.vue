<template>
    <div class="input_control_checkbox" @click="changed">
        <i class="icon wh15 primary" :class="[checkboxIcon]"></i>
        <span v-text="text"></span>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            checkboxIcon() {
                return this.value ? 'icon_checkbox_checked' : 'icon_checkbox_unchecked';
            }
        },
        methods: {
            changed() {
                this.$emit('input', !this.value);
            }
        }
    }
</script>
