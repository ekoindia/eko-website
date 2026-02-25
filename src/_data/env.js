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
	FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID || '',

	GTM_KEY: process.env.GTM_KEY || '', // New key to add GTM script in the project (replaces GA_KEY & FACEBOOK_PIXEL_ID)

	ZOHO_SALESIQ: process.env.ZOHO_SALESIQ || '',
	ZOHO_PAGESENSE_URL: process.env.ZOHO_PAGESENSE_URL || '',

	ZOHO_FORM_URL: process.env.ZOHO_FORM_URL || '',
	ZOHO_FORM_RETAIL_URL: process.env.ZOHO_FORM_RETAIL_URL || '',
	ZOHO_FORM_API_URL: process.env.ZOHO_FORM_API_URL || '',
	ZOHO_FORM_GRIEVANCE_URL: process.env.ZOHO_FORM_GRIEVANCE_URL || '',
	ZOHO_FORM_WHITELABEL_URL: process.env.ZOHO_FORM_WHITELABEL_URL || '',
	ZOHO_FORM_SBI_KIOSK_URL: process.env.ZOHO_FORM_SBI_KIOSK_URL || '',

	ZOHO_CRM_ZCGA_SCRIPT_URL: process.env.ZOHO_CRM_ZCGA_SCRIPT_URL || '',

	DEBUG_SECTIONS: process.env.DEBUG_SECTIONS || null,
}
