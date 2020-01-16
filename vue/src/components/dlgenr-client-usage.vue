<template>
    <p class="dlgenr-client-usage" v-if="register && usage">
        <span class="dlgenr-client-usage-label">Usage: </span>
        <span class="dlgenr-client-usage-content">{{ usage }}</span>
        <span class="dlgenr-client-usage-label"> - Register: </span>
        <span class="dlgenr-client-usage-content">{{ register }}</span>
    </p>
</template>
<script>
    export default {
        name: 'dlgenr-client-usage',
        props: { entry : { type : XMLDocument }},
        data: function() {
            let usageContent;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('usg')[0] != undefined){
                usageContent = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('usg')[0].childNodes[0].nodeValue;
            }
            let usageRegister;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('usg')[0] != undefined){
                usageRegister = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('usg')[0].getAttribute('register');
            }
            return { 'usage': usageContent, 'register' : usageRegister }
        }
    }
</script>
<style scoped>
    p.dlgenr-client-usage 
    { 
        font-family: 'Cormorant Garamond', serif; 
        font-weight: medium; 
        color: black;
        font-size: 12pt;
        margin-left: 40pt;
        margin-top: 0pt;
        margin-bottom: 0pt;
        margin-right: 20pt;
        text-align: left;
    }
    span.dlgenr-client-usage-label
    {
        font-family: 'Cormorant Garamond', serif; 
        font-weight: medium; 
        color: black;
        font-size: 12pt;
    }
    span.dlgenr-client-usage-content
    {
        font-family: 'Cormorant Garamond', serif; 
        font-weight: medium; 
        color: black;
        font-size: 12pt;
    }
</style>