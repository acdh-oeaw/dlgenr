<template>
    <span class="dlgenr-client-note-term-syriac">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-term-syriac',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-term-syriac {
        font-family: 'Times New Roman', times, serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>