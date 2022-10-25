import $ from 'jquery'

export class RadSearch {
  static setup() {
    $(document).ready(function() {
      $('#save_and_apply_filters').click(function(e) {
        e.preventDefault();
        let filterName = window.prompt('Enter a filter name', '');
        if (filterName) {
        $('#search_saved_name').val(filterName);
        } else {
            window.alert('Name was not provided, filter could not be saved.');
        }
        $('.simple_form.search').submit();
      });
    });
  }
}
