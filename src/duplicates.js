export class Duplicates {
    static setup() {
        if($('#duplicate-toast').length) {
            $('.duplicate-card').hide();
            Duplicates.checkForDuplicates();
            let form = $('form.simple_form');
            form.find('input').not('#create-anyway').change(function() {
                Duplicates.checkForDuplicates();
            });

            $('#create-anyway').change(function() {
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
            let html = '<table class=\'table\'>';
            let first = data.duplicates[0].duplicate_data;
            html += '<tr>';
            Object.keys(first).forEach(field => {
                html += `<th>${field}</th>`;
            });
            html += '<th>Actions</th>';
            html += '</tr>';
            data.duplicates.forEach(duplicate => {
                html += '<tr>';
                Object.values(duplicate.duplicate_data).forEach(value => {
                    html += `<td>${value || ''}</td>`;
                });
                html += `<td><a href='${duplicate.duplicate_path}' class='btn btn-sm btn-primary'>Show Duplicate</a></td>`;
                html += '</tr>';
            });
            html += '</table>';
            $('.duplicate-card .duplicate-data').html(html);
            $('.duplicate-card').show();
            this.toggleSave(true);
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
