<template>
    <span class="dlgenr-client-header-hebrew">{{ headerHebrew }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-header-hebrew',
    props : { headerHebrew : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-header-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: normal;
        font-size: 18pt;
        color: black;
        background-color: #facf8e;
        border-radius: 2.5pt;
        padding: 5pt;
    }
</style>