// ThinkWP: To push UTM's on the Zoho CRM for iframe-based Zoho Forms

function ZFAdvLead() {}
ZFAdvLead.utmPValObj = ZFAdvLead.utmPValObj || {};

ZFAdvLead.utmPNameArr = new Array('utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'); ZFAdvLead.utmcustPNameArr = new Array();

ZFAdvLead.prototype.zfautm_sC = function (paramName, path, domain, secure) {
	var value = ZFAdvLead.utmPValObj[paramName];
	if (typeof value !== "undefined" && value !== null) {
		var cookieStr = paramName + "=" + escape(value);
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + 7);
		cookieStr += "; expires=" + exdate.toGMTString();
		cookieStr += "; path=/";
		if (domain) {
			cookieStr += "; domain=" + escape(domain);
		}
		if (secure) {
			cookieStr += "; secure";
		}
		document.cookie = cookieStr;
	}
};

ZFAdvLead.prototype.zfautm_ini = function () {
	this.zfautm_bscPCap();
	var url_search = document.location.search;
	for (var i = 0; i < ZFAdvLead.utmcustPNameArr.length; i++) {
		var zf_pN = ZFAdvLead.utmcustPNameArr[i];
		var zf_pV;
		if (zf_pN == 'referrername') {
			zf_pV = document.location.href;
		} else {
			zf_pV = this.zfautm_gP(url_search, zf_pN);
			if (zf_pV == undefined || zf_pV == '') {
				zf_pV = this.zfautm_gC(zf_pN);
			}
		}
		if (typeof zf_pV !== "undefined" && zf_pV !== null & zf_pV != "") {
			ZFAdvLead.utmPValObj[zf_pN] = zf_pV;
		}
	}
	for (var pkey in ZFAdvLead.utmPValObj) {
		this.zfautm_sC(pkey);
	}
};

ZFAdvLead.prototype.zfautm_bscPCap = function () {
	var trafSrc = this.zfautm_calcTrafSrc();
	if (trafSrc.source != "") {
		ZFAdvLead.utmPValObj.utm_source = trafSrc.source;
	}
	if (trafSrc.medium != "") {
		ZFAdvLead.utmPValObj.utm_medium = trafSrc.medium;
	}
	if (trafSrc.campaign != "") {
		ZFAdvLead.utmPValObj.utm_campaign = trafSrc.campaign;
	}
	if (trafSrc.term != "") {
		ZFAdvLead.utmPValObj.utm_term = trafSrc.term;
	}
	if (trafSrc.content != "") {
		ZFAdvLead.utmPValObj.utm_content = trafSrc.content;
	}
}

ZFAdvLead.prototype.zfautm_calcTrafSrc = function () {
	var u1 = '', u2 = '', u3 = '', u4 = '', u5 = '';
	var search_engines = [['bing', 'q'], ['google', 'q'], ['yahoo', 'q'], ['baidu', 'q'], ['yandex', 'q'], ['ask', 'q']]; //List of search engines
	var ref = document.referrer;
	ref = ref.substr(ref.indexOf('//') + 2);
	ref_domain = ref;
	ref_path = '/';
	ref_search = '';

	// Checks for campaign parameters
	var url_search = document.location.search;
	if (url_search.indexOf('utm_source') > -1 || url_search.indexOf('utm_medium') > -1 || url_search.indexOf('utm_campaign') > -1 || url_search.indexOf('utm_term') > -1 || url_search.indexOf('utm_content') > -1) {
		u1 = this.zfautm_gP(url_search, 'utm_source');
		u2 = this.zfautm_gP(url_search, 'utm_medium');
		u3 = this.zfautm_gP(url_search, 'utm_campaign');
		u4 = this.zfautm_gP(url_search, 'utm_term');
		u5 = this.zfautm_gP(url_search, 'utm_content');
	} else if (this.zfautm_gP(url_search, 'gclid')) {
		u1 = 'Google Ads';
		u2 = 'cpc';
		u3 = '(not set)';
		if (!ZFAdvLead.utmcustPNameArr.includes('gclid')) {
			ZFAdvLead.utmcustPNameArr.push('gclid');
		}
	} else if (ref) {
		var r_u1 = this.zfautm_gC('utm_source');
		var r_u2 = this.zfautm_gC('utm_medium');
		var r_u3 = this.zfautm_gC('utm_campaign');
		var r_u4 = this.zfautm_gC('utm_term');
		var r_u5 = this.zfautm_gC('utm_content');
		if (typeof r_u1 === "undefined" && typeof r_u2 === "undefined" && typeof r_u3 === "undefined" && typeof r_u4 === "undefined" && typeof r_u5 === "undefined") {
			// separate domain, path and query parameters
			if (ref.indexOf('/') > -1) {
				ref_domain = ref.substr(0, ref.indexOf('/'));
				ref_path = ref.substr(ref.indexOf('/'));
				if (ref_path.indexOf('?') > -1) {
					ref_search = ref_path.substr(ref_path.indexOf('?'));
					ref_path = ref_path.substr(0, ref_path.indexOf('?'));
				}
			}
			u2 = 'referral';
			u1 = ref_domain;
			// Extract term for organic source
			for (var i = 0; i < search_engines.length; i++) {
				if (ref_domain.indexOf(search_engines[i][0]) > -1) {
					u2 = 'organic';
					u1 = search_engines[i][0];
					u4 = this.zfautm_gP(ref_search, search_engines[i][1]) || '(not provided)';
					break;
				}
			}
		} else {
			if (typeof r_u1 !== "undefined") {
				u1 = r_u1;
			}
			if (typeof r_u2 !== "undefined") {
				u2 = r_u2;
			}
			if (typeof r_u3 !== "undefined") {
				u3 = r_u3;
			}
			if (typeof r_u4 !== "undefined") {
				u4 = r_u4;
			}
			if (typeof r_u5 !== "undefined") {
				u5 = r_u5;
			}
		}
	} else {
		var r_u1 = this.zfautm_gC('utm_source');
		var r_u2 = this.zfautm_gC('utm_medium');
		var r_u3 = this.zfautm_gC('utm_campaign');
		var r_u4 = this.zfautm_gC('utm_term');
		var r_u5 = this.zfautm_gC('utm_content');
		if (typeof r_u1 === "undefined" && typeof r_u2 === "undefined" && typeof r_u3 === "undefined" && typeof r_u4 === "undefined" && typeof r_u5 === "undefined") {
			var locRef = document.location.href;
			locRef = locRef.substr(locRef.indexOf('//') + 2);
			if (locRef.indexOf('/') > -1) {
				locRef = locRef.substr(0, locRef.indexOf('/'));
			}
			u1 = locRef;
			u2 = 'referral';
		} else {
			if (typeof r_u1 !== "undefined") {
				u1 = r_u1;
			}
			if (typeof r_u2 !== "undefined") {
				u2 = r_u2;
			}
			if (typeof r_u3 !== "undefined") {
				u3 = r_u3;
			}
			if (typeof r_u4 !== "undefined") {
				u4 = r_u4;
			}
			if (typeof r_u5 !== "undefined") {
				u5 = r_u5;
			}
		}
	}
	return {
		'source': u1,
		'medium': u2,
		'campaign': u3,
		'term': u4,
		'content': u5
	};
}

ZFAdvLead.prototype.zfautm_gP = function (s, q) {
	try {
		var match = s.match('[?&]' + q + '=([^&]+)');
		return match ? match[1] : '';
	} catch (e) {
		return '';
	}
}

ZFAdvLead.prototype.zfautm_gC = function (cookieName) {
	var cookieArr = document.cookie.split('; ');
	for (var i = 0; i < cookieArr.length; i++) {
		var cookieVals = cookieArr[i].split('=');
		if (cookieVals[0] === cookieName && cookieVals[1]) {
			return unescape(cookieVals[1]);
		}
	}
};

ZFAdvLead.prototype.zfautm_iframeSprt = function () {
	var zf_frame = document.getElementsByTagName("iframe");
	for (var i = 0; i < zf_frame.length; ++i) {
		if ((zf_frame[i].src).indexOf('formperma') > 0) {
			var zf_src = zf_frame[i].src;
			for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
				var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
				var utmVal = this.zfautm_gC(ZFAdvLead.utmPNameArr[prmIdx]);
				if (typeof utmVal !== "undefined") {
					if (utmVal != "") {
						if (zf_src.indexOf('?') > 0) {
							zf_src = zf_src + '&' + utmPm + '=' + utmVal;
						} else {
							zf_src = zf_src + '?' + utmPm + '=' + utmVal;
						}
					}
				}
			}
			if (zf_frame[i].src.length < zf_src.length) {
				zf_frame[i].src = zf_src;
			}
		}
	}
};

ZFAdvLead.prototype.zfautm_DHtmlSprt = function () {
	var zf_formsArr = document.forms;
	for (var frmInd = 0; frmInd < zf_formsArr.length; frmInd++) {
		var zf_form_act = zf_formsArr[frmInd].action;
		if (zf_form_act && zf_form_act.indexOf('formperma') > 0) {
			for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
				var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
				var utmVal = this.zfautm_gC(ZFAdvLead.utmPNameArr[prmIdx]);
				if (typeof utmVal !== "undefined") {
					if (utmVal != "") {
						var fieldObj = zf_formsArr[frmInd][utmPm];
						if (fieldObj) {
							fieldObj.value = utmVal;
						}
					}
				}
			}
		}
	}
};

ZFAdvLead.prototype.zfautm_jsEmbedSprt = function (id) {
	document.getElementById('zforms_iframe_id').removeAttribute("onload");
	var jsEmbdFrm = document.getElementById("zforms_iframe_id");
	var embdSrc = jsEmbdFrm.src;
	for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
		var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
		var utmVal = this.zfautm_gC(ZFAdvLead.utmPNameArr[prmIdx]);
		if (typeof utmVal !== "undefined") {
			if (utmVal != "") {
				if (embdSrc.indexOf('?') > 0) {
					embdSrc = embdSrc + '&' + utmPm + '=' + utmVal;
				} else {
					embdSrc = embdSrc + '?' + utmPm + '=' + utmVal;
				}
			}
		}
	}
	jsEmbdFrm.src = embdSrc;
};

var zfutm_zfAdvLead = new ZFAdvLead();

zfutm_zfAdvLead.zfautm_ini();

if (document.readyState == "complete") {
	zfutm_zfAdvLead.zfautm_iframeSprt();
	zfutm_zfAdvLead.zfautm_DHtmlSprt();
} else {
	window.addEventListener('load', function () {
		zfutm_zfAdvLead.zfautm_iframeSprt();
		zfutm_zfAdvLead.zfautm_DHtmlSprt();
	}, false);
}