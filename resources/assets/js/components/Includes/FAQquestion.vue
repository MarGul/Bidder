<template>
    <div class="faq-question">
        <header class="question-header">
            <slot name="question"></slot>
        </header>
        <div class="question-body">
            <slot name="answer"></slot>
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>
