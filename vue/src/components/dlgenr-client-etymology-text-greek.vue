<template>
    <span class="dlgenr-client-etymology-text-greek">{{ segment.content }}</span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-text-greek',
    props: { segment: { type: Object }},
}
</script>
<style scoped>
    span.dlgenr-client-etymology-text-greek {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        color: black;
    }
</style>