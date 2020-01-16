<template>
    <span class="dlgenr-client-etymology-text-hebrew">{{ segment.content }}</span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-text-hebrew',
    props: { segment: { type: Object }},
}
</script>
<style scoped>
    span.dlgenr-client-etymology-text-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: normal;
        font-size: 12pt;
        color: black;
    }
</style>