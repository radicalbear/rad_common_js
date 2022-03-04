import $ from 'jquery';

import {RadCommonGlobalSearch} from "radCommonGlobalSearch";
import {RadCommonAutoComplete} from "radCommonAutoComplete";
import {RadCommonDynamicUpdater} from "./radCommonDynamicUpdater";

export class RadCommon {
    static setup() {
        $(document).ready( function() {
            RadCommonAutoComplete.setup();
            RadCommonGlobalSearch.setup();
            RadCommonDynamicUpdater.setup();
        })
    }
}
