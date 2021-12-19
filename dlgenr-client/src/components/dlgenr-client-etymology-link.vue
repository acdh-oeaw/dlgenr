<template>
    <span class="dlgenr-client-etymology-link">
        <a :href="target" target="_blank">{{ linkText }}</a>
    </span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-link',
    props: { target: { type: String },
             linkText: { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-etymology-link {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
    span.dlgenr-client-etymology-link a:link { color: #fc9803;}
    span.dlgenr-client-etymology-link a:hover { color: #fc9803;}
    span.dlgenr-client-etymology-link a:visited { color: #fc9803;}
    span.dlgenr-client-etymology-link a:active { color: #fc9803;}
</style>