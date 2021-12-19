<template>
    <span class="dlgenr-client-note-term-transcription">〈{{ content }}〉</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-term-transcription',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-term-transcription {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>