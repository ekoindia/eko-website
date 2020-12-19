/**
	Setup envoirnment variables to used in the project.
	For local development, setup the variables in an ".env" file. See ".env.example" file.
	These can be accessed anywhere in the project as:
		env.VARIABLE_NAME
*/

module.exports = {
	BASE_URL: process.env.BASE_URL || '',
	GA_KEY: process.env.GA_KEY || '',
	MS_CLARITY_TAG: process.env.MS_CLARITY_TAG || '',
	ZOHO_SALESIQ_WIDGETCODE: process.env.ZOHO_SALESIQ_WIDGETCODE || '',
	ZOHO_FORM_URL: process.env.ZOHO_FORM_URL || '',
	DEBUG_SECTIONS: process.env.DEBUG_SECTIONS || null
}
