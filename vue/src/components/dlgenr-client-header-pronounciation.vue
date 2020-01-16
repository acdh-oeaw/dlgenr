<template>
    <span class="dlgenr-client-header-pronounciation">|{{ headerPronounciation }}|</span>
</template>
<script>
export default {
    name : 'dlgenr-client-header-pronounciation',
    props : { headerPronounciation : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-header-pronounciation {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 14pt;
        color: black;
    }
</style>