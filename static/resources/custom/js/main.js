$(function() {
    
    var dom_prets = $('#form_prets_list');

    function alert_display(alert_type, title, text) {
        var alert_message = $('#alert_message');

        alert_message.removeClass('alert-success alert-danger');
        alert_message.addClass('alert-' + alert_type);

        alert_message.find('strong').text(title);
        alert_message.find('span').text(text);

        alert_message.show();
    }
    
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
                }
            }
        });
    }

    function pret_add(pret_quoi, pret_qui, pret_etat) {
        $.ajax({
            type: 'POST',
            url: '/prets',
            data: JSON.stringify({
                pret_quoi: pret_quoi,
                pret_qui: pret_qui,
                pret_etat: pret_etat
            }),
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            success: function(data) {
                alert_display('success', 'Ajout du prêt réussi !', '');
                $('#form_pret_id').val(parseInt(data.pret_id));
                prets_refresh();
            },
            error: function(data) {
                alert_display('danger', 'Erreur !', data.responseJSON.error);
            }
        });
    }

    function pret_modify(pret_quoi, pret_qui, pret_etat) {
        var pret_id = $('#form_pret_id').val();
        if (pret_id == '') {
            alert('Veuillez sélectionner un prêt pour pouvoir le modifier.');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: '/prets/' + pret_id,
            data: JSON.stringify({
                pret_quoi: pret_quoi,
                pret_qui: pret_qui,
                pret_etat: pret_etat
            }),
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            success: function() {
                alert_display('success', 'Modification réussie !', '');
                prets_refresh();
            },
            error: function(data) {
                alert_display('danger', 'Erreur !', data.responseJSON.error);
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

    $('#form_pret_update').click(function() {
        pret_modify(
            $('#form_pret_quoi').val(),
            $('#form_pret_qui').val(),
            $('input[name=form_pret_etat]:checked').val()
        );
    });

    prets_refresh();

});