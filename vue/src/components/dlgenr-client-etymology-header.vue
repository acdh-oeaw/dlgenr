<template>
    <span class="text-etymology-header">{{ segment.content }}</span>
</template>
<script>
export default {
    name: 'dlgenr-client-text-latin-normal',
    // props: { segmentLabel: { Type: Object } },
    data : function() { return { 'segment' : this.$attrs.segment }}
}
</script>
<style scoped>
    span.text-etymology-header {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>