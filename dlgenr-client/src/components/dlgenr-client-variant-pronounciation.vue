<template>
    <span class="dlgenr-client-variant-pronounciation"> |{{ pronounciation }}|</span>
</template>
<script>
export default {
    name : 'dlgenr-client-variant-pronounciation',
    props : { pronounciation : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-variant-pronounciation {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>