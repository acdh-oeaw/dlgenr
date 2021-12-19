<template>
    <div class="dlgenr-client-usage" v-if="usageAvailable">
        <p class="dlgenr-client-usage-label">Usage: </p>
        <dlgenr-client-usage-entry v-for="(usageEntry,index) in usageEntries" v-bind:key="index" v-bind:usageEntry="usageEntry"/>
    </div>
</template>
<script>
    import DlGenRClientUsageEntry from './dlgenr-client-usage-entry';
    export default {
        name : 'dlgenr-client-usage',
        components : {
            'dlgenr-client-usage-entry' : DlGenRClientUsageEntry
        },
        props : { entry : { type : XMLDocument }},
        computed : {
            usageEntries(){
                let position = this.$attrs.position;
                let usageEntries = new Array();
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('usg')[0] !== undefined){
                    let numberOfUsageElements = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('usg').length;
                    for (let i = 0; i < numberOfUsageElements; i++){
                        let usageType = "";
                        if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('usg')[i].getAttribute('type') !== undefined){
                            let usageTypeTEI = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('usg')[i].getAttribute('type');
                            switch (usageTypeTEI){
                                case 'attitude': usageType = "Attitude"; break;
                                case 'domain': usageType = "Domain"; break;
                                case 'frequency': usageType = "Frequency"; break;
                                case 'geographic': usageType = "Geographic"; break;
                                case 'hint': usageType = "Hint"; break;
                                case 'meaningType': usageType = "Meaning type"; break;
                                case 'normativity': usageType = "Normativity"; break;
                                case 'socioCultural': usageType = "Socio cultural"; break;
                                case 'textType': usageType = "Text type"; break;
                                case 'time': usageType = "Time"; break;
                                default: usageType = usageTypeTEI;
                            }
                        }
                        let usageContent = "";
                        if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('usg')[i].childNodes[0] !== undefined){
                            usageContent = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('usg')[i].childNodes[0].nodeValue;
                        }
                        let isNotLast = true;
                        if (i === numberOfUsageElements - 1){ isNotLast = false; }
                        let usageEntry = { 'usageType' : usageType, 'usageContent' : usageContent, 'isNotLast' : isNotLast };

                        usageEntries.push(usageEntry);
                    }
                }
                return usageEntries;
            },
            usageAvailable(){
                let position = this.$attrs.position;
                let usageAvailable = true;
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('usg')[0] === undefined){
                    usageAvailable = false;
                }
                return usageAvailable;
            }
        }
    }
</script>
<style scoped>
    div.dlgenr-client-usage
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
    p.dlgenr-client-usage-label
    {
        font-family: 'Cormorant Garamond', serif; 
        font-weight: medium; 
        color: black;
        font-size: 12pt;
        margin-top: 0pt;
        margin-bottom: 0pt;
    }
</style>