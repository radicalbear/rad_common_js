import $ from "jquery";

export class AreYouSure {


    static setup() {
        $('.simple_form').areYouSure();
        AreYouSure.setupDatePickers();
    }

    static setupDatePickers() {
        $('.date, .time, .datetime_local').on('dp.change', function(e) {
            let didChange = e.date && e.oldDate && !RadCommon.sameDate(e.date, e.oldDate);
            if(didChange) {
                $(this).trigger('change');
            }
        });
    }

    static datePrecision(input) {
        input = $(input);
        if (input.hasClass('date')) {
            return 'day';
        }
        if (input.hasClass('time')) {
            return 'minute';
        }
        if (input.hasClass('datetime_local')) {
            return 'minute';
        }
    };

    static sameDate (date, oldDate) {
        return date.isSame(oldDate, RadCommon.datePrecision(this));
    };
}
