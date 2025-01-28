require('jquery');
require('@rails/ujs').start();
require('@popperjs/core');
require('readmore-js');
require('./richtext');

const bootstrap = require('bootstrap');

import { RadCommonDynamicUpdater } from './radCommonDynamicUpdater';
import { RadCommonGeneral } from './radCommonGeneral';
import { AreYouSure } from './areYouSure';
import { DateSetup } from './dateSetup';
import { BatchActions } from './batchActions';
import { Duplicates } from './duplicates';
import { RadTomSelect } from './radTomSelect';
import { SentryTest } from './sentry';

import './radTurbo';

export class RadCommon {
  static setup() {
    $(document).ready(function () {
      RadCommonGeneral.setup();
      RadCommonDynamicUpdater.setup();
      AreYouSure.setup();
      RadCommon.bootstrapSetup();
      DateSetup.setup();
      Duplicates.setup();
      BatchActions.setup();
      SentryTest.setup();
      RadTomSelect.setup();
    });
  }

  static bootstrapSetup() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }
}
