<template>
    <span class="dlgenr-client-etymology-text-latin">{{ localContent }}</span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-text-latin',
    // props: { segment: { Type: Object } },
    data : function() { return { 'localContent' : this.$attrs.content }}
}
</script>
<style scoped>
    span.dlgenr-client-etymology-text-latin {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>