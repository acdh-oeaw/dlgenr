<template>
    <span class="dlgenr-client-note-bibl-modern">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-bibl-modern',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-bibl-modern {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>