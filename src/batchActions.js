export class BatchActions {
  static setup() {
    $('.batch-action-tooltip').tooltip();
    $('#batch_action_select_all').click(function() {
      let is_checked;
      is_checked = $(this).is(':checked');
      if (is_checked) {
        $('#batch-action-dropdown').removeClass('disabled');
        $('.batch-action-tooltip').tooltip('disable');
      } else {
        $('#batch-action-dropdown').addClass('disabled');
        $('.batch-action-tooltip').tooltip('enable');
      }
      return $('.bulk-action-checkbox').each(function() {
        return $(this).prop('checked', is_checked);
      });
    });
    return $('.bulk-action-checkbox').click(function() {
      let all_deselected;
      if ($(this).is(':checked')) {
        $('#batch-action-dropdown').removeClass('disabled');
        $('.batch-action-tooltip').tooltip('disable');
        if ($('.bulk-action-checkbox').toArray().every(function(cb) {
          return cb.checked;
        })) {
          return $('#batch_action_select_all').prop('checked', true);
        }
      } else {
        $('#batch_action_select_all').prop('checked', false);
        all_deselected = $('.bulk-action-checkbox').toArray().every(function(cb) {
          return !cb.checked;
        });
        if (all_deselected) {
          $('#batch-action-dropdown').addClass('disabled');
          return $('.batch-action-tooltip').tooltip('enable');
        }
      }
    });
  }
}
