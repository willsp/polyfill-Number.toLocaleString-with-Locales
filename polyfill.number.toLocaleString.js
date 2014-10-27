// polyfill.number.toLocaleDateString
/*jshint sub:true*/

(function() {
    'use strict';

    // Got this from MDN:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#Example:_Checking_for_support_for_locales_and_options_arguments
    function toLocaleStringSupportsLocales() {
        var number = 0;
        try {
            number.toLocaleString("i");
        } catch (e) {
            return e.name === "RangeError";
        }
        return false;
    }

    if (!toLocaleStringSupportsLocales()) {
        var replaceSeparators = function(sNum, separators) {
            var sNumParts = sNum.split('.');
            if (separators && separators.thousands) {
                sNumParts[0] = sNumParts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + separators.thousands);
            }
            sNum = sNumParts.join(separators.decimal);

            return sNum;
        };

        var dotThousCommaDec = function(sNum) {
            var separators = {
                decimal: ',',
                thousands: '.'
            };

            return replaceSeparators(sNum, separators);
        };

        var commaThousDotDec = function(sNum) {
            var separators = {
                decimal: '.',
                thousands: ','
            };

            return replaceSeparators(sNum, separators);
        };

        var spaceThousCommaDec = function(sNum) {
            var seperators = {
                decimal: ',',
                thousands: '\u00A0'
            };

            return replaceSeparators(sNum, seperators);
        };

        var transformForLocale = {
            ca: dotThousCommaDec,
            in: dotThousCommaDec,
            us: commaThousDotDec,
            it: dotThousCommaDec,
            fr: spaceThousCommaDec,
            de: dotThousCommaDec,
            "de-DE": dotThousCommaDec,
            "de-AT": dotThousCommaDec,
            "de-CH": dotThousCommaDec,
            "de-LI": dotThousCommaDec,
            "de-BE": dotThousCommaDec
        };
        
        var currencyCodes = {
	        "eur": "€",
	        "usd": "$"
        }

        Number.prototype.toLocaleString = function(locale, options) {
            if (locale && locale.length < 2)
                throw new RangeError("Invalid language tag: " + locale);

            var sNum;

            if (options && options.minimumFractionDigits) {
                sNum = this.toFixed(options.minimumFractionDigits);
            } else {
                sNum = this.toString();
            }

            locale = locale && locale.toLowerCase().match(/^\w+/);

            if (transformForLocale.hasOwnProperty(locale)) {
                sNum = transformForLocale[locale](sNum, options);
            } else {
                sNum = transformForLocale['us'](sNum, options);
            }
            
            if(options.currency) {
	            if(options.currencyDisplay=="code") {
		            sNum+=" "+options.currency.toUpperCase();
	            } else {
		            sNum+=" "+currencyCodes[options.currency.toLowerCase()];
	            }
            }

            return sNum;
        };
    }

}());
