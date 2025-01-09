require('jquery');
require('@rails/ujs').start();
require('popper.js');
require('bootstrap');
require('readmore-js');
require('./richtext');

import { RadCommonGlobalSearch } from './radCommonGlobalSearch';
import { RadCommonAutoComplete } from './radCommonAutoComplete';
import { RadCommonDynamicUpdater } from './radCommonDynamicUpdater';
import { RadCommonGeneral } from './radCommonGeneral';
import { AreYouSure } from './areYouSure';
import { DateSetup } from './dateSetup';
import { RadSearch } from './radSearch';
import { BatchActions } from './batchActions';
import { Duplicates } from './duplicates';
import { RadTomSelect } from './radTomSelect';
import { SentryTest } from './sentry';

import './radTurbo';

export class RadCommon {
  static setup() {
    $(document).ready(function () {
      RadCommonAutoComplete.setup();
      RadCommonGlobalSearch.setup();
      RadCommonGeneral.setup();
      RadCommonDynamicUpdater.setup();
      AreYouSure.setup();
      RadCommon.bootstrapSetup();
      DateSetup.setup();
      RadSearch.setup();
      Duplicates.setup();
      BatchActions.setup();
      SentryTest.setup();
      RadTomSelect.setup();
    });
  }

  static bootstrapSetup() {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
  }
}
