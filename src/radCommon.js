import $ from 'jquery'
import {RadCommonGlobalSearch} from "./src/radCommonGlobalSearch";
import {RadCommonAutoComplete} from "./src/radCommonAutoComplete";

export class RadCommon {
    static setup() {
        $(document).ready( function() {
            RadCommonAutoComplete.setup();
            RadCommonGlobalSearch.setup();
        })
    }
}
