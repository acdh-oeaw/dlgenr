<template>
    <p class="dlgenr-client-label" v-if="label">
        <!--<span class="dlgenr-client-label-label">Label: </span>-->
        <span class="dlgenr-client-label-content">{{ label }}</span>
    </p>
</template>
<script>
    export default {
        name: 'dlgenr-client-label',
        props: { entry: {type: XMLDocument} },
        data: function() {
            let labelContent;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('lbl')[0] != undefined){
                labelContent = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('lbl')[0].childNodes[0].nodeValue;
            }
            return { 'label': labelContent }
        }
    }
</script>
<style scoped>
    p.dlgenr-client-label {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
        text-align: left;
        margin-left: 40pt;
        margin-right: 20pt;
        margin-top: 0pt;
        margin-bottom: 0pt;
        padding: 0pt;
    }
    span.dlgenr-client-label-label {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
    span.dlgenr-client-label-content {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        font-weight: medium;
        color: black;
    }
</style>