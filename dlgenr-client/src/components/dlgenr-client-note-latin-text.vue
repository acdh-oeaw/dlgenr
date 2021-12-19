<template>
    <span class="dlgenr-client-note-latin-text">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-latin-text',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-latin-text {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>