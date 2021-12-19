<template>
    <span class="dlgenr-client-etymology-link-label"> {{ linkLabel }} </span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-link-label',
    props: { linkLabel: { type: String } }
}
</script>
<style scoped>
    span.dlgenr-client-etymology-link-label {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>