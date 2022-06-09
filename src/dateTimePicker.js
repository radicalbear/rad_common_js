require('tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min');

export class DateTimePicker {

    formattingDefaults = {
        dateFormat: {
            format: 'YYYY-MM-DD',
            view: 'M/D/YYYY'
        }
    };

    set_date(sel, date) {
        var format, thisObj;
        thisObj = this;
        if (sel.hasClass("date")) {
            format = 'M/D/YYYY';
        } else if (sel.hasClass("time")) {
            format = 'h:mm A';
        } else if (sel.hasClass("datetime_local")) {
            format = 'M/D/YYYY h:mm A';
        }
        return sel.val(moment(date).format(format));
    };

    time_convert(time, from, to) {
        if (time) {
            if (!moment(time, to, true).isValid()) {
                return moment(time, from).format(to);
            } else {
                return time;
            }
        } else {
            return '';
        }
    };

    view_formatter($obj, format, view) {
        var thisObj;
        thisObj = this;
        return $obj.each(function() {
            var field;
            field = $(this);
            field.val(thisObj.time_convert(field.val(), format, view));
            return $(this).closest('form').on('submit', function() {
                return field.val(thisObj.time_convert(field.val(), view, format));
            });
        });
    };

    formatDateType(value, viewFormat) {
        let format, view;
        format = this.formattingDefaults.dateFormat.format;
        view = this.formattingDefaults.dateFormat.view;
        if (viewFormat) {
            return this.time_convert(value, format, view);
        } else {
            return this.time_convert(value, view, format);
        }
    };

    do_default_input_changes (sel, format, view) {
        this.view_formatter(sel, format, view);
        sel.attr("autocomplete", "off");
        return sel.each(function() {
            var default_current_date, default_date_or_time, keepOpen;
            default_current_date = $(this).data("default-current-date");
            default_date_or_time = $(this).data("default");
            keepOpen = $(this).data("keep-open") != null ? $(this).data("keep-open") : true;
            $(this).datetimepicker({
                format: view,
                keepOpen: keepOpen,
                useCurrent: default_current_date,
                defaultDate: default_date_or_time,
                buttons: {
                    showToday: true,
                    showClear: true
                },
                icons: {
                    time: 'fa fa-clock fa-regular',
                    date: 'fa fa-calendar',
                    up: 'fa fa-arrow-up',
                    down: 'fa fa-arrow-down',
                    previous: 'fa fa-arrow-left',
                    next: 'fa fa-arrow-right',
                    today: 'fa fa-calendar fa-regular',
                    clear: 'fa fa-times-circle'
                }
            });
            $(this).click(function() {
                $(this).datetimepicker('show');
            });
            $(this).focus(function() {
                $(this).datetimepicker('show');
            });
            return $(this).blur(function() {
                $(this).datetimepicker('hide');
            });
        });
    };

    addDateEvents() {
        var format, sel, view;
        format = 'YYYY-MM-DD';
        view = 'M/D/YYYY';
        sel = $("input.date:not([data-html-5='true'])");
        this.do_default_input_changes(sel, format, view);
        format = 'HH:mm:ss.SSS';
        view = 'h:mm A';
        sel = $("input.time");
        this.do_default_input_changes(sel, format, view);
        format = 'YYYY-MM-DDTHH:mm';
        view = 'M/D/YYYY h:mm A';
        sel = $("input.datetime_local");
        return this.do_default_input_changes(sel, format, view);
    };

    static disableHtml5() {
        $('input[type="date"]:not([data-html-5=\'true\'])').attr('type', 'text');
        $('input[type="time"]').attr('type', 'text');
        return $('input[type="datetime-local"]').attr('type', 'text');
    };

    static setup() {
        let dateTimePicker = new DateTimePicker();
        DateTimePicker.disableHtml5();
        return dateTimePicker.addDateEvents();
    }

}
