<template>
    <div class="avatar-container" :class="[size]" :style="avatar"></div>
</template>

<script>
export default {
  
    name: 'Avatar',

    props: {
        imageUrl: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: '-small'
        }
    },

    computed: {
        avatar() {
            return {backgroundImage: `url(${this.imageUrl})`}
        }
    }

}
</script>

