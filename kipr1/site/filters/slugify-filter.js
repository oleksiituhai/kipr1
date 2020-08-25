const builtinReplacements = [ 
    ['Є', 'Ye'], ['І', 'I'], ['Ї', 'Yi'], ['Ґ', 'G'], ['є', 'ye'], ['і', 'i'], ['ї', 'yi'], ['ґ', 'g'], // Ukrainian 
    ['α', 'a'], ['β', 'v'], ['γ', 'g'], ['δ', 'd'], ['ε', 'e'], ['ζ', 'z'], ['η', 'i'], ['θ', 'th'], ['ι', 'i'], ['κ', 'k'], ['λ', 'l'], ['μ', 'm'], ['ν', 'n'], ['ξ', 'ks'], ['ο', 'o'], ['π', 'p'], ['ρ', 'r'], ['σ', 's'], ['τ', 't'], ['υ', 'y'], ['φ', 'f'], ['χ', 'x'], ['ψ', 'ps'], ['ω', 'o'], ['ά', 'a'], ['έ', 'e'], ['ί', 'i'], ['ό', 'o'], ['ύ', 'y'], ['ή', 'i'], ['ώ', 'o'], ['ς', 's'], ['ϊ', 'i'], ['ΰ', 'y'], ['ϋ', 'y'], ['ΐ', 'i'], ['Α', 'A'], ['Β', 'B'], ['Γ', 'G'], ['Δ', 'D'], ['Ε', 'E'], ['Ζ', 'Z'], ['Η', 'I'], ['Θ', 'TH'], ['Ι', 'I'], ['Κ', 'K'], ['Λ', 'L'], ['Μ', 'M'], ['Ν', 'N'], ['Ξ', 'KS'], ['Ο', 'O'], ['Π', 'P'], ['Ρ', 'R'], ['Σ', 'S'], ['Τ', 'T'], ['Υ', 'Y'], ['Φ', 'F'], ['Χ', 'X'], ['Ψ', 'PS'], ['Ω', 'O'], ['Ά', 'A'], ['Έ', 'E'], ['Ί', 'I'], ['Ό', 'O'], ['Ύ', 'Y'], ['Ή', 'I'], ['Ώ', 'O'], ['Ϊ', 'I'], ['Ϋ', 'Y'], // Greek 
    ['ş', 's'], ['Ş', 'S'], ['ç', 'c'], ['Ç', 'C'], ['ğ', 'g'], ['Ğ', 'G'], ['ı', 'i'], ['İ', 'I'],     // Turkish 
    ['А', 'A'], ['а', 'a'], ['Б', 'B'], ['б', 'b'], ['В', 'V'], ['в', 'v'], ['Г', 'G'], ['г', 'g'], ['Д', 'D'], ['д', 'd'], ['Е', 'E'], ['е', 'e'], ['Ж', 'Zh'], ['ж', 'zh'], ['З', 'Z'], ['з', 'z'], ['И', 'I'], ['и', 'i'], ['Й', 'J'], ['й', 'j'], ['К', 'K'], ['к', 'k'], ['Л', 'L'], ['л', 'l'], ['М', 'M'], ['м', 'm'], ['Н', 'N'], ['н', 'n'], ['О', 'O'], ['о', 'o'], ['П', 'P'], ['п', 'p'], ['Р', 'R'], ['р', 'r'], ['С', 'S'], ['с', 's'], ['Т', 'T'], ['т', 't'], ['У', 'U'], ['у', 'u'], ['Ф', 'F'], ['ф', 'f'], ['Х', 'H'], ['х', 'h'], ['Ц', 'Cz'], ['ц', 'cz'], ['Ч', 'Ch'], ['ч', 'ch'], ['Ш', 'Sh'], ['ш', 'sh'], ['Щ', 'Shh'], ['щ', 'shh'], ['Ъ', ''], ['ъ', ''], ['Ы', 'Y'], ['ы', 'y'], ['Ь', ''], ['ь', ''], ['Э', 'E'], ['э', 'e'], ['Ю', 'Yu'], ['ю', 'yu'], ['Я', 'Ya'], ['я', 'ya'], ['Ё', 'Yo'], ['ё', 'yo'] // Russian
];

const escapeStringRegexp = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
};

const doCustomReplacements = (string, replacements) => {
	for (const [key, value] of replacements) {
		string = string.replace(new RegExp(escapeStringRegexp(key), 'g'), value);
	}
	return string;
};

const transliterate = (string, options) => {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a string, got \`${typeof string}\``);
	}
	options = { customReplacements: [],	...options };
	const customReplacements = new Map([ ...builtinReplacements, ...options.customReplacements ]);
	string = string.normalize();
	string = doCustomReplacements(string, customReplacements);
	return string;
};

const decamelize = string => {
	return string
		.replace(/([A-Z]{2,})(\d+)/g, '$1 $2')
		.replace(/([a-z\d]+)([A-Z]{2,})/g, '$1 $2')
		.replace(/([a-z\d])([A-Z])/g, '$1 $2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2');
};

const removeMootSeparators = (string, separator) => {
	const escapedSeparator = escapeStringRegexp(separator);
	return string
		.replace(new RegExp(`${escapedSeparator}{2,}`, 'g'), separator)
		.replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, 'g'), '');
};


module.exports = function slugify(string, options){
    
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a string, got \`${typeof string}\``);
    }
    
	options = { separator: '-', lowercase: true, decamelize: true, customReplacements: [], preserveLeadingUnderscore: false, ...options	};
	const shouldPrependUnderscore = options.preserveLeadingUnderscore && string.startsWith('_');
	const customReplacements = new Map([ ... builtinReplacements, ...options.customReplacements ]);
	string = transliterate(string, {customReplacements});
    
    if (options.decamelize) { 
        string = decamelize(string);
    }

    let patternSlug = /[^a-zA-Z\d]+/g;
    
	if (options.lowercase) {
		string = string.toLowerCase();
		patternSlug = /[^a-z\d]+/g;
    }
    
    string = string
        .replace(patternSlug, options.separator)
        .replace(/\\/g, '');
        
	if (options.separator) {
		string = removeMootSeparators(string, options.separator);
	}

	if (shouldPrependUnderscore) {
		string = `_${string}`;
	}

	return string;
};
