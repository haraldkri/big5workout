import {formatPickerDuration, formatSeconds, parsePickerDuration} from './formatTime';

describe('formatSeconds', () => {
    it('formats seconds correctly', () => {
        expect(formatSeconds(0)).toEqual('0:00');
        expect(formatSeconds(1)).toEqual('0:01');
        expect(formatSeconds(10)).toEqual('0:10');
        expect(formatSeconds(60)).toEqual('1:00');
        expect(formatSeconds(61)).toEqual('1:01');
        expect(formatSeconds(600)).toEqual('10:00');
        expect(formatSeconds(601)).toEqual('10:01');
    });
});

describe('formatPickerDuration', () => {
    it('formats seconds correctly', () => {
        expect(formatPickerDuration(0)).toEqual({
            minutes: '0',
            seconds: '0'
        });
        expect(formatPickerDuration(1)).toEqual({
            minutes: '0',
            seconds: '1'
        });
        expect(formatPickerDuration(10)).toEqual({
            minutes: '0',
            seconds: '10'
        });
        expect(formatPickerDuration(60)).toEqual({
            minutes: '1',
            seconds: '0'
        });
        expect(formatPickerDuration(61)).toEqual({
            minutes: '1',
            seconds: '1'
        });
        expect(formatPickerDuration(600)).toEqual({
            minutes: '10',
            seconds: '0'
        });
        expect(formatPickerDuration(601)).toEqual({
            minutes: '10',
            seconds: '1'
        });
    });
})

describe('parsePickerDuration', () => {
    it('formats seconds correctly', () => {
        expect(parsePickerDuration({
            minutes: '0',
            seconds: '0'
        })).toEqual(0);
        expect(parsePickerDuration({
            minutes: '0',
            seconds: '1'
        })).toEqual(1);
        expect(parsePickerDuration({
            minutes: '0',
            seconds: '10'
        })).toEqual(10);
        expect(parsePickerDuration({
            minutes: '1',
            seconds: '0'
        })).toEqual(60);
        expect(parsePickerDuration({
            minutes: '1',
            seconds: '1'
        })).toEqual(61);
        expect(parsePickerDuration({
            minutes: '10',
            seconds: '0'
        })).toEqual(600);
        expect(parsePickerDuration({
            minutes: '10',
            seconds: '1'
        })).toEqual(601);
    });
})