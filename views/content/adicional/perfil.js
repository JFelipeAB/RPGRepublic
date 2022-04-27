$(document).ready(function () {
    perfil.configFIcha();
});

var perfil = function () {
    
    var configFIcha = function () {
        debugger;
        $('#imgIcone').attr("src", usuario.icon);
        $('#lblLogin').text(usuario.login);
        $('#lblNivel').text("Nível " + usuario.nivel + " XP: ");
        $('#lblEmail').text("E-mail: " + usuario.eMail);
        $('#lblRank').text("Rank: " + usuario.acesso);
        // $('#').val("");
        // $('#').val("");
    };

    return {
        configFIcha: configFIcha,
    }

}();
