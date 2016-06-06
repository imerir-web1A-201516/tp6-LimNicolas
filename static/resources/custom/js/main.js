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

    prets_refresh();

});