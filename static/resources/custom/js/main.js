$(function() {
    
    var dom_prets = $('#form_prets_list');
    
    function prets_refresh() {
        $.ajax('/prets', {
            success: function (prets) {
                dom_prets.empty();

                for (var pret_index in prets) {
                    var pret = prets[pret_index];
                    dom_prets.append($('<option>', {
                        value: pret.pret_id,
                        text: pret.pret_quoi + ' (' + pret.pret_qui + ')'
                    }));
                    console.log(pret)
                }
            }
        });
    }

    function pret_add(pret_quoi, pret_qui, pret_etat) {
        var yolo = {
                pret_quoi: pret_quoi,
                pret_qui: pret_qui,
                pret_etat: pret_etat
            };
        console.log(yolo);

        $.ajax({
            type: 'post',
            url: '/prets',
            data: JSON.stringify(yolo),
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            success: function(data) {
                $('#form_pret_id').val(parseInt(data.pret_id));
                prets_refresh();
            }
        });
    }

    function populate_pret(pret_id) {
        $.ajax('/prets/' + pret_id, {
            success: function (pret) {
                $('#form_pret_id').val(parseInt(pret.pret_id));
                $('#form_pret_quoi').val(pret.pret_quoi);
                $('#form_pret_qui').val(pret.pret_qui);

                var radio_name = 'form_pret_etat_' + pret.pret_etat;
                $('#' + radio_name).prop('checked', true);
            }
        });
    }

    $('#form_pret_create').click(function() {
        pret_add(
            $('#form_pret_quoi').val(),
            $('#form_pret_qui').val(),
            $('input[name=form_pret_etat]:checked').val()
        );
    });

    dom_prets.change(function() {
        var pret_id = $(this).val();
        populate_pret(pret_id);
    });

    prets_refresh();

});