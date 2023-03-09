export class DeviseTwilioVerify {
  static setup() {
    $('a#twilio-verify-request-sms-link').unbind('ajax:success');
    $('a#twilio-verify-request-sms-link').bind('ajax:success', function(evt, data, _status, _xhr) {
      alert(data.message);
    });

    $('a#twilio-verify-request-phone-call-link').unbind('ajax:success');
    $('a#twilio-verify-request-phone-call-link').bind('ajax:success', function(evt, data, _status, _xhr) {
      alert(data.message);
    });
  }
}
