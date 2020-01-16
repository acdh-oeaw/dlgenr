<template>
    <span class="dlgenr-client-note-term-greek">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-term-greek',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-term-greek {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>