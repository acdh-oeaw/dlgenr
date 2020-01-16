<template>
    <span class="dlgenr-client-grammatical-information-content">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-grammatical-information-content',
    props : { content : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-grammatical-information-content {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>