export class RadSearch {
  static setup() {
    const saveAndApplyFiltersBtn = document.getElementById('save_and_apply_filters');
    if (saveAndApplyFiltersBtn) {
      saveAndApplyFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let filterName = window.prompt('Enter a filter name', '');
        if (filterName) {
          document.getElementById('search_saved_name').value = filterName;
        } else {
          window.alert('Name was not provided, filter could not be saved.');
        }
        document.querySelector('.simple_form.search').submit();
      });
    }
  }
}