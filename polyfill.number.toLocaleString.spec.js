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

    it('returns a string formatted in Canadian style (1.234,5) when passed CA', function() {
        var num = 1234.5;
        var locale = 'CA';

        expect(num.toLocaleString(locale)).toBe('1.234,5');
    });

    it('returns a string formatted in Indian style (1.234,5) when passed IN', function() {
        var num = 1234.5;
        var locale = 'IN';

        expect(num.toLocaleString(locale)).toBe('1.234,5');
    });

    it('returns a string formatted in FR style (1,234.5) when passed FR', function() {
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

    it('returns a formatted string based only on the language code in complex locale codes', function() {
        var num = 1234.5;
        var locale = 'it-US';

        expect(num.toLocaleString(locale)).toBe('1.234,5');
    })

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
});
