export class BatchActions {
  static setup() {
    document.querySelectorAll('.batch-action-tooltip').forEach(el => new bootstrap.Tooltip(el));

    const batchActionSelectAll = document.getElementById('batch_action_select_all');
    const batchActionDropdown = document.getElementById('batch-action-dropdown');
    const bulkActionCheckboxes = document.querySelectorAll('.bulk-action-checkbox');

    if (batchActionSelectAll) {
      batchActionSelectAll.addEventListener('click', function() {
        const isChecked = this.checked;
        if (batchActionDropdown) {
          if (isChecked) {
            batchActionDropdown.classList.remove('disabled');
            document.querySelectorAll('.batch-action-tooltip').forEach(tooltipEl => {
              let tooltipInstance = bootstrap.Tooltip.getInstance(tooltipEl);
              if (tooltipInstance) {
                tooltipInstance.disable();
              }
            });
          } else {
            batchActionDropdown.classList.add('disabled');
            document.querySelectorAll('.batch-action-tooltip').forEach(tooltipEl => {
              let tooltipInstance = bootstrap.Tooltip.getInstance(tooltipEl);
              if (tooltipInstance) {
                tooltipInstance.enable();
              }
            });
          }
        }
        bulkActionCheckboxes.forEach(cb => cb.checked = isChecked);
      });
    }

    bulkActionCheckboxes.forEach(cb => {
      cb.addEventListener('click', function() {
        const allChecked = [...bulkActionCheckboxes].every(cb => cb.checked);
        const allDeselected = [...bulkActionCheckboxes].every(cb => !cb.checked);
        if (batchActionDropdown) {
          if (this.checked) {
            batchActionDropdown.classList.remove('disabled');
            if (allChecked) {
              batchActionSelectAll.checked = true;
            }
          } else {
            batchActionSelectAll.checked = false;
            if (allDeselected) {
              batchActionDropdown.classList.add('disabled');
            }
          }
          document.querySelectorAll('.batch-action-tooltip').forEach(tooltipEl => {
            let tooltipInstance = bootstrap.Tooltip.getInstance(tooltipEl);
            if (tooltipInstance) {
              this.checked ? tooltipInstance.disable() : tooltipInstance.enable();
            }
          });
        }
      });
    });
  }
}
