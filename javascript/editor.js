var search_field = document.getElementById('search_field');
var editor = CodeMirror.fromTextArea(search_field, {
    lineNumbers: false
});
editor.getDoc().setValue("");

jQuery(document).ready(function($){
$("#aramaic_language").on('mouseover',function(event){ $(this).css('background-color','#f7e9c3'); });
$("#aramaic_language").on('mouseleave',function(event){ $(this).css('background-color','white'); });

$("#greek_language").on('mouseover',function(event){ $(this).css('background-color','#f7e9c3'); });
$("#greek_language").on('mouseleave',function(event){ $(this).css('background-color','white'); });

$("#latin_language").on('mouseover',function(event){ $(this).css('background-color','#f7e9c3'); });
$("#latin_language").on('mouseleave',function(event){ $(this).css('background-color','white'); });

$("#submit_search").on('mouseover',function(event){ $(this).css('background-color','#eba134'); });
$("#submit_search").on('mouseleave',function(event){ $(this).css('background-color','white'); });

$("#clear_field").on('mouseover',function(event){ $(this).css('background-color','#eba134'); });
$("#clear_field").on('mouseleave',function(event){ $(this).css('background-color','white'); });

$("#clear_field").on('click',function(event){ editor.getDoc().setValue(""); $("#placeholder_for_searchcontent").text(""); });

$("#submit_search").on('click',function(event){ $("#placeholder_for_searchcontent").text(editor.getDoc().getValue());});

var aramaic_keymap = { "'>'" : function(editor){ editor.getDoc().replaceRange('א',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'b'" : function(editor){ editor.getDoc().replaceRange('ב',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'g'" : function(editor){ editor.getDoc().replaceRange('ג',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'d'" : function(editor){ editor.getDoc().replaceRange('ד',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'h'" : function(editor){ editor.getDoc().replaceRange('ה',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'w'" : function(editor){ editor.getDoc().replaceRange('ו',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'Z'" : function(editor){ editor.getDoc().replaceRange('ז',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'H'" : function(editor){ editor.getDoc().replaceRange('ח',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'T'" : function(editor){ editor.getDoc().replaceRange('ט',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'y'" : function(editor){ editor.getDoc().replaceRange('י',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'k'" : function(editor){ editor.getDoc().replaceRange('כ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
				       "'l'" : function(editor){ editor.getDoc().replaceRange('ל',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'m'" : function(editor){ editor.getDoc().replaceRange('מ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'n'" : function(editor){ editor.getDoc().replaceRange('נ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'S'" : function(editor){ editor.getDoc().replaceRange('ס',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'<'" : function(editor){ editor.getDoc().replaceRange('ע',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'p'" : function(editor){ editor.getDoc().replaceRange('פ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'z'" : function(editor){ editor.getDoc().replaceRange('צ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'q'" : function(editor){ editor.getDoc().replaceRange('ק',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'r'" : function(editor){ editor.getDoc().replaceRange('ר',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'s'" : function(editor){ editor.getDoc().replaceRange('ש',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);},
					   "'t'" : function(editor){ editor.getDoc().replaceRange('ת',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);}};
					   
var greek_keymap = {
	"'a'" : function(editor){ editor.getDoc().replaceRange('α',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'b'" : function(editor){ editor.getDoc().replaceRange('β',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'g'" : function(editor){ editor.getDoc().replaceRange('γ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'d'" : function(editor){ editor.getDoc().replaceRange('δ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'e'" : function(editor){ editor.getDoc().replaceRange('ε',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'z'" : function(editor){ editor.getDoc().replaceRange('ζ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'E'" : function(editor){ editor.getDoc().replaceRange('η',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'T'" : function(editor){ editor.getDoc().replaceRange('θ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'i'" : function(editor){ editor.getDoc().replaceRange('ι',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'k'" : function(editor){ editor.getDoc().replaceRange('κ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'l'" : function(editor){ editor.getDoc().replaceRange('λ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'m'" : function(editor){ editor.getDoc().replaceRange('μ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'n'" : function(editor){ editor.getDoc().replaceRange('ν',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'x'" : function(editor){ editor.getDoc().replaceRange('ξ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'o'" : function(editor){ editor.getDoc().replaceRange('ο',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'p'" : function(editor){ editor.getDoc().replaceRange('π',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'r'" : function(editor){ editor.getDoc().replaceRange('ρ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'s'" : function(editor){ editor.getDoc().replaceRange('σ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'t'" : function(editor){ editor.getDoc().replaceRange('τ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'u'" : function(editor){ editor.getDoc().replaceRange('υ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'P'" : function(editor){ editor.getDoc().replaceRange('φ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'C'" : function(editor){ editor.getDoc().replaceRange('χ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'y'" : function(editor){ editor.getDoc().replaceRange('ψ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'O'" : function(editor){ editor.getDoc().replaceRange('ω',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'|'" : function(editor){ editor.getDoc().replaceRange('ͺ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'<'" : function(editor){ editor.getDoc().replaceRange('̔',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'>'" : function(editor){ editor.getDoc().replaceRange('̓',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'~'" : function(editor){ editor.getDoc().replaceRange('͂',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'´'" : function(editor){ editor.getDoc().replaceRange('́',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"'`'" : function(editor){ editor.getDoc().replaceRange('̀',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); },
	"':'" : function(editor){ editor.getDoc().replaceRange('̈',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false); }
};

$("#aramaic_language").on('click',function(event){ $(".keymap-char").remove(); editor.removeKeyMap(greek_keymap); 
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_alef"><p class="paragraph-keymap-char">&gt; &DoubleRightArrow; &#x05D0;</p></div>'); 
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_beth"><p class="paragraph-keymap-char">b &DoubleRightArrow; &#x05D1;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_gamal"><p class="paragraph-keymap-char">g &DoubleRightArrow; &#x05D2;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_dalath"><p class="paragraph-keymap-char">d &DoubleRightArrow; &#x05D3;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_he"><p class="paragraph-keymap-char">h &DoubleRightArrow; &#x05D4;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_waw"><p class="paragraph-keymap-char">w &DoubleRightArrow; &#x05D5;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_zain"><p class="paragraph-keymap-char">Z &DoubleRightArrow; &#x05D6;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_heth"><p class="paragraph-keymap-char">H &DoubleRightArrow; &#x05D7;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_teth"><p class="paragraph-keymap-char">T &DoubleRightArrow; &#x05D8;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_yud"><p class="paragraph-keymap-char">y &DoubleRightArrow; &#x05D9;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_kaph"><p class="paragraph-keymap-char">k &DoubleRightArrow; &#x05DB;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_lamad"><p class="paragraph-keymap-char">l &DoubleRightArrow; &#x05DC;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_min"><p class="paragraph-keymap-char">m &DoubleRightArrow; &#x05DE;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_nun"><p class="paragraph-keymap-char">n &DoubleRightArrow; &#x05E0;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_semkath"><p class="paragraph-keymap-char">S &DoubleRightArrow; &#x05E1;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_ain"><p class="paragraph-keymap-char">&lt; &DoubleRightArrow; &#x05E2;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_pe"><p class="paragraph-keymap-char">p &DoubleRightArrow; &#x05E4;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_sade"><p class="paragraph-keymap-char">z &DoubleRightArrow; &#x05E6;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_qoph"><p class="paragraph-keymap-char">q &DoubleRightArrow; &#x05E7;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_ris"><p class="paragraph-keymap-char">r &DoubleRightArrow; &#x05E8;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_shin"><p class="paragraph-keymap-char">s &DoubleRightArrow; &#x05E9;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_aramaic_taw"><p class="paragraph-keymap-char">t &DoubleRightArrow; &#x05EA;</p></div>');
						editor.addKeyMap(aramaic_keymap,false);
						
						$(".keymap-char").on('mouseover',function(event){$(this).css('background-color','#ded6b6');});
						$(".keymap-char").on('mouseleave',function(event){$(this).css('background-color','white');});
						
						$("#keymap_aramaic_alef").on('click',function(event){editor.getDoc().replaceRange('א',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_beth").on('click',function(event){editor.getDoc().replaceRange('ב',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_gamal").on('click',function(event){editor.getDoc().replaceRange('ג',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_dalath").on('click',function(event){editor.getDoc().replaceRange('ד',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_he").on('click',function(event){editor.getDoc().replaceRange('ה',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_waw").on('click',function(event){editor.getDoc().replaceRange('ו',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_zain").on('click',function(event){editor.getDoc().replaceRange('ז',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_heth").on('click',function(event){editor.getDoc().replaceRange('ח',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_teth").on('click',function(event){editor.getDoc().replaceRange('ט',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_yud").on('click',function(event){editor.getDoc().replaceRange('י',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_kaph").on('click',function(event){editor.getDoc().replaceRange('כ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_lamad").on('click',function(event){editor.getDoc().replaceRange('ל',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_min").on('click',function(event){editor.getDoc().replaceRange('מ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_nun").on('click',function(event){editor.getDoc().replaceRange('נ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_semkath").on('click',function(event){editor.getDoc().replaceRange('ס',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_ain").on('click',function(event){editor.getDoc().replaceRange('ע',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_pe").on('click',function(event){editor.getDoc().replaceRange('פ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_sade").on('click',function(event){editor.getDoc().replaceRange('צ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_qoph").on('click',function(event){editor.getDoc().replaceRange('ק',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_ris").on('click',function(event){editor.getDoc().replaceRange('ר',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_shin").on('click',function(event){editor.getDoc().replaceRange('ש',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_aramaic_taw").on('click',function(event){editor.getDoc().replaceRange('ת',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						}
						 );
	
$("#greek_language").on('click',function(event){ editor.removeKeyMap(aramaic_keymap); editor.addKeyMap(greek_keymap,false); $('.keymap-char').remove();
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_alpha"><p class="paragraph-keymap-char">a &DoubleRightArrow; &#x03B1;</p></div>'); 
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_beth"><p class="paragraph-keymap-char">b &DoubleRightArrow; &#x03B2;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_gamma"><p class="paragraph-keymap-char">g &DoubleRightArrow; &#x03B3;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_delta"><p class="paragraph-keymap-char">d &DoubleRightArrow; &#x03B4;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_epsilon"><p class="paragraph-keymap-char">e &DoubleRightArrow; &#x03B5;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_zeta"><p class="paragraph-keymap-char">z &DoubleRightArrow; &#x03B6;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_eta"><p class="paragraph-keymap-char">E &DoubleRightArrow; &#x03B7;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_theta"><p class="paragraph-keymap-char">T &DoubleRightArrow; &#x03B8;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_iota"><p class="paragraph-keymap-char">i &DoubleRightArrow; &#x03B9;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_kappa"><p class="paragraph-keymap-char">k &DoubleRightArrow; &#x03BA;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_lambda"><p class="paragraph-keymap-char">l &DoubleRightArrow; &#x03BB;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_mim"><p class="paragraph-keymap-char">m &DoubleRightArrow; &#x03BC;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_nun"><p class="paragraph-keymap-char">n &DoubleRightArrow; &#x03BD;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_xi"><p class="paragraph-keymap-char">x &DoubleRightArrow; &#x03BE;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_omikron"><p class="paragraph-keymap-char">o &DoubleRightArrow; &#x03BF;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_pe"><p class="paragraph-keymap-char">p &DoubleRightArrow; &#x03C0;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_resh"><p class="paragraph-keymap-char">r &DoubleRightArrow; &#x03C1;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_sigma"><p class="paragraph-keymap-char">s &DoubleRightArrow; &#x03C3;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_tau"><p class="paragraph-keymap-char">t &DoubleRightArrow; &#x03C4;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_ypsilon"><p class="paragraph-keymap-char">u &DoubleRightArrow; &#x03C5;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_phi"><p class="paragraph-keymap-char">P &DoubleRightArrow; &#x03C6;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_chi"><p class="paragraph-keymap-char">c &DoubleRightArrow; &#x03C7;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_psi"><p class="paragraph-keymap-char">y &DoubleRightArrow; &#x03C8;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_omega"><p class="paragraph-keymap-char">O &DoubleRightArrow; &#x03C9;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_lenis"><p class="paragraph-keymap-char">´ &DoubleRightArrow; &#x0301;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_asper"><p class="paragraph-keymap-char">` &DoubleRightArrow; &#x0300;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_iotasubscr"><p class="paragraph-keymap-char">| &DoubleRightArrow; &#x037A;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_diaresis"><p class="paragraph-keymap-char">: &DoubleRightArrow; &#x0308;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_acute"><p class="paragraph-keymap-char">&gt; &DoubleRightArrow; &#x0313;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_grave"><p class="paragraph-keymap-char">&lt; &DoubleRightArrow; &#x0314;</p></div>');
							$("#placeholder_for_inputmap").append('<div class="keymap-char" id="keymap_greek_tilde"><p class="paragraph-keymap-char">~ &DoubleRightArrow; &#x0342;</p></div>');
						$("#keymap_greek_alpha").on('click',function(event){editor.getDoc().replaceRange('α',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_beth").on('click',function(event){editor.getDoc().replaceRange('β',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_gamma").on('click',function(event){editor.getDoc().replaceRange('γ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_delta").on('click',function(event){editor.getDoc().replaceRange('δ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_epsilon").on('click',function(event){editor.getDoc().replaceRange('ε',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_zeta").on('click',function(event){editor.getDoc().replaceRange('ζ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_eta").on('click',function(event){editor.getDoc().replaceRange('η',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_theta").on('click',function(event){editor.getDoc().replaceRange('θ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_iota").on('click',function(event){editor.getDoc().replaceRange('ι',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_kappa").on('click',function(event){editor.getDoc().replaceRange('κ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_lambda").on('click',function(event){editor.getDoc().replaceRange('λ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_mim").on('click',function(event){editor.getDoc().replaceRange('μ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_nun").on('click',function(event){editor.getDoc().replaceRange('ν',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_xi").on('click',function(event){editor.getDoc().replaceRange('ξ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_omikron").on('click',function(event){editor.getDoc().replaceRange('ο',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_pe").on('click',function(event){editor.getDoc().replaceRange('π',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_resh").on('click',function(event){editor.getDoc().replaceRange('ρ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_sigma").on('click',function(event){editor.getDoc().replaceRange('σ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_tau").on('click',function(event){editor.getDoc().replaceRange('τ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_ypsilon").on('click',function(event){editor.getDoc().replaceRange('υ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_phi").on('click',function(event){editor.getDoc().replaceRange('φ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_chi").on('click',function(event){editor.getDoc().replaceRange('χ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_psi").on('click',function(event){editor.getDoc().replaceRange('ψ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_omega").on('click',function(event){editor.getDoc().replaceRange('ω',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_acute").on('click',function(event){editor.getDoc().replaceRange('̓',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_grave").on('click',function(event){editor.getDoc().replaceRange('̔',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_iotasubscr").on('click',function(event){editor.getDoc().replaceRange('ͺ',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_diaresis").on('click',function(event){editor.getDoc().replaceRange('̈',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_lenis").on('click',function(event){editor.getDoc().replaceRange('́',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_asper").on('click',function(event){editor.getDoc().replaceRange('̀',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						$("#keymap_greek_tilde").on('click',function(event){editor.getDoc().replaceRange('͂',editor.getDoc().getCursor('from'),editor.getDoc().getCursor('to'),false);});
						
						$(".keymap-char").on('mouseover',function(event){$(this).css('background-color','#ded6b6');});
						$(".keymap-char").on('mouseleave',function(event){$(this).css('background-color','white');});
});
$("#latin_language").on('click',function(event){ $(".keymap-char").remove(); editor.removeKeyMap(aramaic_keymap); editor.removeKeyMap(greek_keymap); });
});