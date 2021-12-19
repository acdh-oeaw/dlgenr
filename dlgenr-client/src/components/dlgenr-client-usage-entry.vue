<template>
    <div class="dlgenr-client-usage-entry">
        <span class="dlgenr-client-usage-entry-type">{{ usageEntry.usageType }}</span>
        <span class="dlgenr-client-usage-entry-delimiter">: </span>
        <span class="dlgenr-client-usage-entry-value">{{ usageEntry.usageContent }}</span>
        <!--<span class="dlgenr-client-usage-entry-delimiter" v-if="usageEntry.isNotLast">, </span>-->
    </div>
</template>
<script>
export default {
    name : 'dlgenr-client-usage-entry',
    computed : {
        usageEntry(){
            return this.$attrs.usageEntry;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-usage-entry-type
    {
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
        color: black;
        font-size: 12pt;
        text-align: left;
    }
    span.dlgenr-client-usage-entry-delimiter
    {
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
        color: black;
        font-size: 12pt;
    }
    span.dlgenr-client-usage-entry-value
    {
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
        color: black;
        font-size: 12pt;
    }
    div.dlgenr-client-usage-entry
    {
        display: block;
        margin-left: 20pt;
    }
</style>