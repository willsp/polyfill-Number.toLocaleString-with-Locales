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
            if (separators && separators.decimal) {
                sNum = sNum.replace(/\./, separators.decimal);
            }
            if (separators && separators.thousands) {
                sNum = sNum.replace(/\B(?=(\d{3})+(?!\d))/g, separators.thousands);
            }

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
                thousands: ','
            };

            return replaceSeparators(sNum, separators);
        };

        var transformForLocale = {
            CA: dotThousCommaDec,
            IN: dotThousCommaDec,
            US: commaThousDotDec
        };

        Number.prototype.toLocaleString = function(locale) {
            var sNum;

            sNum = this.toString();

            if (transformForLocale.hasOwnProperty(locale)) {
                sNum = transformForLocale[locale](sNum);
            } else {
                sNum = transformForLocale['US'](sNum);
            }

            return sNum;
        };
    }

}());
