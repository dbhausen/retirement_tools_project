class RegexConstants {
	static regexPassword = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/

	static regexLower = /(?=.*[a-z])/

	static regexUpper = /(?=.*[A-Z])/

	static regexNumberOrSpecial = /(?=.*[!@#$%^&*0-9])/

	static regexRepeat = /^(?!.*(\w)\1{2,}).+$/
}

export default RegexConstants
