<template>
    <span class="dlgenr-client-inflected-form-pronounciation"> |{{ pronounciation }}|</span>
</template>
<script>
export default {
    name : 'dlgenr-client-inflected-form-pronounciation',
    props : { pronounciation : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-inflected-form-pronounciation {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>