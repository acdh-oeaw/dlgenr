<template>
    <span class="text-etymology-header">{{ header }}</span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-header',
    props: { header: { type: String } }
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