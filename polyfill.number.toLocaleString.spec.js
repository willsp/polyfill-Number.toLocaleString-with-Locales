// polyfill.number.toLocaleString
/*global describe, it, expect*/

describe('number.toLocaleString(locale) polyfill', function() {
    'use strict';

    it('needs to be overridden for phantomjs', function() {
        var num = 123456;
        var locale = 'iq';

        function testLocale() {
            return (num).toLocaleString(locale);
        }

        expect(testLocale).not.toThrow();
    });

    it('returns a string', function() {
        var num = 123456;
        var locale = 'CA';
        
        expect(typeof (num.toLocaleString(locale))).toBe('string');
    });

    it('returns a string formatted in FR style (1\u00A0234.5) when passed FR', function() {
        var num = 1234.5;
        var locale = 'FR';

        expect(num.toLocaleString(locale)).toEqual('1\u00A0234,5');
    });

    it('returns a string formatted in US style (1,234.5) when passed US', function() {
        var num = 1234.5;
        var locale = 'US';

        expect(num.toLocaleString(locale)).toBe('1,234.5');
    });

    it('returns a string formatted in IT style (1.234,5) when passed IT', function() {
        var num = 1234.5;
        var locale = 'IT';

        expect(num.toLocaleString(locale)).toBe('1.234,5');
    });
    
    it("returns a string formatted in de-CH style (1'234.5) when passed de-CH", function() {
        var num = 1234.5;
        var locale = 'de-CH';
        
        expect(num.toLocaleString(locale)).toBe("1'234.5");
    });

    it('returns a formatted string based only on the language code in complex locale codes', function() {
        var num = 1234.5;
        var locale = 'it-US';

        expect(num.toLocaleString(locale)).toBe('1.234,5');
    });

    it('returns a string formatted in KR style (1,234.5) when passed KR', function() {
        var num = 1234.5;
        var locale = 'KR';

        expect(num.toLocaleString(locale)).toBe('1,234.5');
    });


    it('returns a string formatted in DK style (1.234,5) when passed da-DK', function() {
        var num = 1234.5;
        var locale = 'da-DK';

        expect(num.toLocaleString(locale)).toBe('1.234,5');
    });

    it('returns a string formatted in NO style (1 234,5) when passed nb-NO', function() {
        var num = 1234.5;
        var locale = 'nb-NO';

        expect(num.toLocaleString(locale)).toBe('1\u00A0234,5');
    });

    it('throws when the language tag does not conform to the standard', function() {
        var num = 1234.5;
        var locale = 'i';

        function testLocale() {
            return (num).toLocaleString(locale);
        }

        expect(testLocale).toThrow(new RangeError("Invalid language tag: " + locale));
    });

    it('should support options with minimumFractionDigits', function() {
        var num = 1234;
        var locale = 'it-IT';

        expect(num.toLocaleString(locale, { minimumFractionDigits: 2 })).toBe('1.234,00');
    });

    it('should support options with minimumFractionDigits', function() {
        var num = 1234.0000;
        var locale = 'it-IT';

        expect(num.toLocaleString(locale, { minimumFractionDigits: 4 })).toBe('1.234,0000');
    });

    it('returns a string formatted in US style (1,234.5) by default', function() {
        var num = 1234.5;

        expect(num.toLocaleString()).toBe('1,234.5');
        expect(num.toLocaleString('MX')).toBe('1,234.5');
        expect(num.toLocaleString('AU')).toBe('1,234.5');
    });

    it('returns a string formatted in Hungarian style (1 234,56) by default', function() {
        var num = 1234.56;

        expect(num.toLocaleString('hu')).toBe('1\u00A0234,56');
        expect(num.toLocaleString('hu-HU')).toBe('1\u00A0234,56');
    });

    it('returns currency properly formatted for the locale specified', function() {
        var num = 1234.56;
        var style = "currency";
        var currency = "USD";
        var currencyDisplay = "symbol";

        expect(num.toLocaleString("en-US", {
            style: style,
            currency: currency
        })).toBe("$1,234.56");

        expect(num.toLocaleString("de-DE", {
            style: style,
            currency: currency
        })).toBe("1.234,56 $");

        expect(num.toLocaleString("ko-KR", {
            style: style,
            currency: "krw"
        })).toBe("₩1,234.56");

        expect(num.toLocaleString("ja-JP", {
            style: style,
            currency: "jpy"
        })).toBe("￥1,234.56");

        expect(num.toLocaleString("hu", {
            style: style,
            currency: "huf"
        })).toBe("1\u00A0234,56 HUF");

        expect(num.toLocaleString("hu-HU", {
            style: style,
            currency: "huf"
        })).toBe("1\u00A0234,56 HUF");

        expect(num.toLocaleString("da-DK", {
            style: style,
            currency: "DKK"
        })).toBe("1.234,56 kr");

        expect(num.toLocaleString("nb-NO", {
            style: style,
            currency: "NOK"
        })).toBe("1\u00A0234,56 kr");
    });
});
