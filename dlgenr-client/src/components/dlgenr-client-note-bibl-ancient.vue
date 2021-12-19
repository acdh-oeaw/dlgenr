<template>
    <span class="dlgenr-client-note-bibl-ancient">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-bibl-ancient',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-bibl-ancient {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        font-style: italic;
        color: black;
    }
</style>