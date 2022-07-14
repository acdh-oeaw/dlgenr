<template>
    <div class="dlgenr-client-citation">
        <span class="dlgenr-client-citation-plain-text">How to cite: Art. </span>
        <span class="dlgenr-client-citation-lemma">{{ lemmaHebrew }}</span>
        <span class="dlgenr-client-citation-plain-text"> in: </span>
        <span class="dlgenr-client-citation-plain-text-italic">Dictionary of Loanwords in the Midrash Genesis Rabbah. </span>
        <span class="dlgenr-client-citation-plain-text">Eds. </span>
        <span class="dlgenr-client-citation-plain-text-caps">Susanne Plietzsch; Christina Katsikadeli; Vladislav Slepoy; Thomas Klampfl. </span>
        <span class="dlgenr-client-citation-url">https://dlgenr.acdh.oeaw.ac.at</span>
        <span class="dlgenr-client-citation-plain-text">, 2021, s.v.</span>
    </div>
</template>
<script>
export default {
    name : 'dlgenr-client-citation',
    props : { entry : { type : XMLDocument }},
    computed : {
            lemmaHebrew(){
                let lemmaHebrew = '';
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0] !== undefined){
                    let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form').length;
                    let positionOfLemma = 0;
                    for (let i = 0; i < numberOfFormNodes; i++){
                        let type = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
                        if (type === 'lemma'){ positionOfLemma = i; }
                    }
                    lemmaHebrew = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
                }
                return lemmaHebrew;
            }
    }
}
</script>
<style scoped>
    div.dlgenr-client-citation {
        margin-left: 40pt;
        margin-bottom: 20pt;
    }
    span.dlgenr-client-citation-lemma {
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: normal;
        font-size: 12pt;
        color: black;
    }
    span.dlgenr-client-citation-plain-text {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
    span.dlgenr-client-citation-plain-text-italic {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-style: italic;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
    span.dlgenr-client-citation-plain-text-caps {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-variant: small-caps;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
    span.dlgenr-client-citation-url {
        font-family: 'Courier New', Courier, monospace, sans-serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>