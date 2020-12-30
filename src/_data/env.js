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

	ZOHO_SALESIQ: process.env.ZOHO_SALESIQ || '',
	ZOHO_SALESIQ_RETAIL: process.env.ZOHO_SALESIQ_RETAIL || '',
	ZOHO_SALESIQ_API: process.env.ZOHO_SALESIQ_API || '',

	ZOHO_FORM_URL: process.env.ZOHO_FORM_URL || '',
	ZOHO_FORM_RETAIL_URL: process.env.ZOHO_FORM_RETAIL_URL || '',
	ZOHO_FORM_API_URL: process.env.ZOHO_FORM_API_URL || '',

	DEBUG_SECTIONS: process.env.DEBUG_SECTIONS || null
}
