// polyfill.number.toLocaleString
/*global describe, it, expect*/

describe('number.toLocaleString(locale) polyfill', function() {
    'use strict';

    function testLocale() {
        return (123456).toLocaleString('i');
    }

    it('needs to be overridden for phantomjs', function() {
        var num = 123456;
        var locale = 'i';
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

    it('returns a string formatted in US style (1,234.5) when passed US', function() {
        var num = 1234.5;
        var locale = 'US';

        expect(num.toLocaleString(locale)).toBe('1,234.5');
    });

    it('returns a string formatted in US style (1,234.5) by default', function() {
        var num = 1234.5;
        
        expect(num.toLocaleString()).toBe('1,234.5');
        expect(num.toLocaleString('MX')).toBe('1,234.5');
        expect(num.toLocaleString('AU')).toBe('1,234.5');
    });
});
