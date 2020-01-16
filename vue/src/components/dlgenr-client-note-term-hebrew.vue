<template>
    <span class="dlgenr-client-note-term-hebrew">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-term-hebrew',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-term-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>