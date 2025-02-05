import { Controller } from '@hotwired/stimulus';
import { Toast } from '../toast';

export default class extends Controller {
  static values = { successMessage: String, errorMessage: String, header: String };

  connect() {
    if (this.successMessageValue) {
      const header = this.hasHeaderValue ? this.headerValue : 'Success!';
      Toast.success(header, this.successMessageValue);
    }

    if (this.errorMessageValue) {
      const header = this.hasHeaderValue ? this.headerValue : 'Error!';
      Toast.error(header, this.errorMessageValue, 10000);
    }
  }
}
