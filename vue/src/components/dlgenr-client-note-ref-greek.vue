<template>
    <span class="dlgenr-client-note-ref-greek">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-ref-greek',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-ref-greek {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: #fc9803;
    }
</style>