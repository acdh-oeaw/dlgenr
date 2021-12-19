function availableLanguages(){
	let providedLanguages = ['hebrew','greek','coptic','arabic','syriac','armenian','latin'];
	return providedLanguages;
}

function getHebrewKeyMap(){

	let hebrew_keymap = new Map();

	hebrew_keymap.set('>' , 'א');
	hebrew_keymap.set('b' , 'ב');
	hebrew_keymap.set('g' , 'ג');
	hebrew_keymap.set('d' , 'ד');
	hebrew_keymap.set('h' , 'ה');
	hebrew_keymap.set('w' , 'ו');
	hebrew_keymap.set('Z' , 'ז');
	hebrew_keymap.set('H' , 'ח');
	hebrew_keymap.set('T' , 'ט');
	hebrew_keymap.set('y' , 'י');
	hebrew_keymap.set('k' , 'כ');
	hebrew_keymap.set('l' , 'ל');
	hebrew_keymap.set('m' , 'מ');
	hebrew_keymap.set('n' , 'נ');
	hebrew_keymap.set('S' , 'ס');
	hebrew_keymap.set('<' , 'ע');
	hebrew_keymap.set('p' , 'פ');
	hebrew_keymap.set('z' , 'צ');
	hebrew_keymap.set('q' , 'ק');
	hebrew_keymap.set('r' , 'ר');
	hebrew_keymap.set('s' , 'ש');
	hebrew_keymap.set('t' , 'ת');

	return hebrew_keymap;
}

function getGreekKeyMap(){
	
	let greek_keymap = new Map();

	greek_keymap.set('a' , 'α');
	greek_keymap.set('b' , 'β');
	greek_keymap.set('g' , 'γ');
	greek_keymap.set('d' , 'δ');
	greek_keymap.set('e' , 'ε');
	greek_keymap.set('z' , 'ζ');
	greek_keymap.set('E' , 'η');
	greek_keymap.set('T' , 'θ');
	greek_keymap.set('i' , 'ι');
	greek_keymap.set('k' , 'κ');
	greek_keymap.set('l' , 'λ');
	greek_keymap.set('m' , 'μ');
	greek_keymap.set('n' , 'ν');
	greek_keymap.set('x' , 'ξ');
	greek_keymap.set('o' , 'ο');
	greek_keymap.set('p' , 'π');
	greek_keymap.set('r' , 'ρ');
	greek_keymap.set('s' , 'σ');
	greek_keymap.set('S' , 'ς');
	greek_keymap.set('t' , 'τ');
	greek_keymap.set('u' , 'υ');
	greek_keymap.set('P' , 'φ');
	greek_keymap.set('c' , 'χ');
	greek_keymap.set('y' , 'ψ');
	greek_keymap.set('O' , 'ω');
	greek_keymap.set('|' , 'ͅ');
	greek_keymap.set('<' , '̔');
	greek_keymap.set('>' , '̓');
	greek_keymap.set('~' , '͂');
	greek_keymap.set('´' , '́');
	greek_keymap.set('`' , '̀');
	greek_keymap.set(':' , '̈');

	return greek_keymap;
}

function getCopticKeyMap(){
	let coptic_keymap = new Map();

	coptic_keymap.set('a' , 'ⲁ');
	coptic_keymap.set('b' , 'ⲃ');
	coptic_keymap.set('g' , 'ⲅ');
	coptic_keymap.set('d' , 'ⲇ');
	coptic_keymap.set('e' , 'ⲉ');
	coptic_keymap.set('z' , 'ⲍ');
	coptic_keymap.set('h' , 'ⲏ');
	coptic_keymap.set('q' , 'ⲑ');
	coptic_keymap.set('i' , 'ⲓ');
	coptic_keymap.set('k' , 'ⲕ');
	coptic_keymap.set('l' , 'ⲗ');
	coptic_keymap.set('m' , 'ⲙ');
	coptic_keymap.set('n' , 'ⲛ');
	coptic_keymap.set('x' , 'ⲝ');
	coptic_keymap.set('o' , 'ⲟ');
	coptic_keymap.set('p' , 'ⲡ');
	coptic_keymap.set('r' , 'ⲣ');
	coptic_keymap.set('s' , 'ⲥ');
	coptic_keymap.set('t' , 'ⲧ');
	coptic_keymap.set('u' , 'ⲩ');
	coptic_keymap.set('f' , 'ⲫ');
	coptic_keymap.set('c' , 'ⲭ');
	coptic_keymap.set('O' , 'ⲱ');
	coptic_keymap.set('S' , 'ϣ');
	coptic_keymap.set('F' , 'ϥ');
	coptic_keymap.set('K' , 'ϧ');
	coptic_keymap.set('H' , 'ϩ');
	coptic_keymap.set('Y' , 'ϫ');
	coptic_keymap.set('Q' , 'ϭ');
	coptic_keymap.set('T' , 'ϯ');
	
	return coptic_keymap;
}

function getArabicKeyMap(){
	let arabic_keymap = new Map();
	
	arabic_keymap.set('*' , 'ء');
	arabic_keymap.set('>' , 'ا');
	arabic_keymap.set('b' , 'ب');
	arabic_keymap.set(':' , 'ة');
	arabic_keymap.set('t' , 'ت');
	arabic_keymap.set('T' , 'ث');
	arabic_keymap.set('j' , 'ج');
	arabic_keymap.set('h' , 'ح');
	arabic_keymap.set('c' , 'خ');
	arabic_keymap.set('d' , 'د');
	arabic_keymap.set('D' , 'ذ');
	arabic_keymap.set('r' , 'ر');
	arabic_keymap.set('z' , 'ز');
	arabic_keymap.set('s' , 'س');
	arabic_keymap.set('S' , 'ش');
	arabic_keymap.set('v' , 'ص');
	arabic_keymap.set('V' , 'ض');
	arabic_keymap.set('y' , 'ط');
	arabic_keymap.set('Y' , 'ظ');
	arabic_keymap.set('<' , 'ع');
	arabic_keymap.set('R' , 'غ');
	arabic_keymap.set('f' , 'ف');
	arabic_keymap.set('q' , 'ق');
	arabic_keymap.set('k' , 'ك');
	arabic_keymap.set('l' , 'ل');
	arabic_keymap.set('m' , 'م');
	arabic_keymap.set('n' , 'ن');
	arabic_keymap.set('H' , 'ه');
	arabic_keymap.set('w' , 'و');
	arabic_keymap.set("'" , 'ى');
	arabic_keymap.set('-' , 'ـ');
	arabic_keymap.set('J' , 'ي');
	arabic_keymap.set('M' , 'ٓ');
	arabic_keymap.set('´' , 'ٔ');
	arabic_keymap.set('`' , 'ٕ');
	arabic_keymap.set('A' , 'ً');
	arabic_keymap.set('U' , 'ٌ');
	arabic_keymap.set('I' , 'ٍ');
	arabic_keymap.set('a' , 'َ');
	arabic_keymap.set('u' , 'ُ');
	arabic_keymap.set('i' , 'ِ');
	arabic_keymap.set('#' , 'ّ');
	arabic_keymap.set('+' , 'ْ');
	
	return arabic_keymap;
}

function getArmenianKeyMap(){
	let armenian_keymap = new Map();
	
	armenian_keymap.set('a' , 'ա');
	armenian_keymap.set('b' , 'բ');
	armenian_keymap.set('g' , 'գ');
	armenian_keymap.set('d' , 'դ');
	armenian_keymap.set('e' , 'ե');
	armenian_keymap.set('z' , 'զ');
	armenian_keymap.set('E' , 'է');
	armenian_keymap.set('q' , 'ը');
	armenian_keymap.set('t' , 'թ');
	armenian_keymap.set('z' , 'ժ');
	armenian_keymap.set('i' , 'ի');
	armenian_keymap.set('l' , 'լ');
	armenian_keymap.set('x' , 'խ');
	armenian_keymap.set('c' , 'ծ');
	armenian_keymap.set('k' , 'կ');
	armenian_keymap.set('h' , 'հ');
	armenian_keymap.set('j' , 'ձ');
	armenian_keymap.set('g' , 'ղ');
	armenian_keymap.set('C' , 'ճ');
	armenian_keymap.set('m' , 'մ');
	armenian_keymap.set('y' , 'յ');
	armenian_keymap.set('n' , 'ն');
	armenian_keymap.set('s' , 'շ');
	armenian_keymap.set('w' , 'ո');
	armenian_keymap.set('X' , 'չ');
	armenian_keymap.set('p' , 'պ');
	armenian_keymap.set('J' , 'ջ');
	armenian_keymap.set('r' , 'ռ');
	armenian_keymap.set('S' , 'ս');
	armenian_keymap.set('v' , 'վ');
	armenian_keymap.set('T' , 'տ');
	armenian_keymap.set('R' , 'ր');
	armenian_keymap.set('Q' , 'ց');
	armenian_keymap.set('Y' , 'ւ');
	armenian_keymap.set('P' , 'փ');
	armenian_keymap.set('K' , 'ք');
	armenian_keymap.set('o' , 'օ');
	armenian_keymap.set('f' , 'ֆ');
	
	return armenian_keymap;
}

function getSyriacKeyMap(){
	let syriac_keymap = new Map();
	
	syriac_keymap.set('>' , 'ܐ');
	syriac_keymap.set('b' , 'ܒ');
	syriac_keymap.set('g' , 'ܓ');
	syriac_keymap.set('d' , 'ܕ');
	syriac_keymap.set('h' , 'ܗ');
	syriac_keymap.set('w' , 'ܘ');
	syriac_keymap.set('z' , 'ܙ');
	syriac_keymap.set('H' , 'ܚ');
	syriac_keymap.set('T' , 'ܛ');
	syriac_keymap.set('y' , 'ܝ');
	syriac_keymap.set('k' , 'ܟ');
	syriac_keymap.set('l' , 'ܠ');
	syriac_keymap.set('m' , 'ܡ');
	syriac_keymap.set('n' , 'ܢ');
	syriac_keymap.set('s' , 'ܣ');
	syriac_keymap.set('<' , 'ܥ');
	syriac_keymap.set('p' , 'ܦ');
	syriac_keymap.set('Z' , 'ܨ');
	syriac_keymap.set('q' , 'ܩ');
	syriac_keymap.set('r' , 'ܪ');
	syriac_keymap.set('S' , 'ܫ');
	syriac_keymap.set('t' , 'ܬ');
	syriac_keymap.set('*' , '݀');
	syriac_keymap.set(';' , '݁');
	syriac_keymap.set(',' , '݂');
	syriac_keymap.set(':' , '̈');
	
	return syriac_keymap;
}

export { availableLanguages,getHebrewKeyMap,getGreekKeyMap,getCopticKeyMap,getArabicKeyMap,getSyriacKeyMap,getArmenianKeyMap };