<template>
    <span class="dlgenr-client-note-term-rabbinic">|{{ content }}|</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-term-rabbinic',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-term-rabbinic {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>