export class Duplicates {
    static setup() {
        if($('#duplicate-toast').length) {
            $('.duplicate-card').hide();
            Duplicates.checkForDuplicates();
            let form = $('#new_client');
            form.find('input').not('#create_anyway').change(function() {
                Duplicates.checkForDuplicates();
            });

            $('#create_anyway').change(function() {
                let disabled = !$(this).prop('checked');
                Duplicates.toggleSave(disabled);
            });
        }
    }

    static checkForDuplicates() {
        let duplicateData = $('#duplicate-toast').data();
        let modelName = duplicateData.model.toLowerCase();
        let form = $(`#new_${modelName}`);
        let data = Duplicates.convertFormToJSON(form, modelName);
        $.ajax({
            type: 'POST',
            url: '/rad_common/duplicates/check_duplicate',
            data: { record: data, model: duplicateData.model },
            success: function(data) {
                Duplicates.processDuplicateData(data);
            },
            dataType: 'json'
        });
    }

    static toggleSave(disabled) {
        let form = $('#new_client');
        form.find('input[type=submit]').prop('disabled', disabled);
    }

    static processDuplicateData(data) {
        if(data.duplicate) {
            $('.toast').toast('show');
            $('#toast-text').html(data.duplicate_data.join('<br />'));
            $('.duplicate-card .duplicate-data').html(data.duplicate_data.join('<br />'));
            $('.duplicate-card').show();
            this.toggleSave(true);
            $('.dup_record_btn').attr('href', data.duplicate_path);
            $('.card-body').addClass('duplicate-body');
        } else {
            $('.toast').toast('hide');
            $('.duplicate-card').hide();
            $('.card-body').removeClass('duplicate-body');
        }
    }

    static convertFormToJSON(form, modelName) {
        return $(form)
            .serializeArray()
            .reduce(function (json, { name, value }) {
                name = name.replace(modelName + '[', '').replace(']', '');
                json[name] = value;
                return json;
            }, {});
    }
}
