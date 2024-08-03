$(document).ready(function() {
    
    function onLoad() {
        $('#acessar').click(function() {
            if (validaCampos()) window.location.href = 'bancoSangue.html';
        });
    }
    
    function validaCampos() {
        let bRetorno = false;
        switch (true) {
            case $('#nome').val().trim() == '':
                alert('Por favor, preencha o campo Nome.');
                break;
            case $('#cpf').val().trim() == '':
                alert('Por favor, preencha o campo CPF.');
                break;
            default:
                bRetorno = validaCPF();
                if (bRetorno) localStorage.setItem('nomeUsuario', $('#nome').val().trim());
                break;
        }
        return bRetorno;
    }

    function validaCPF() {
        let bRetorno = true;
        const cpf = new ValidaCPF($('#cpf').val());
        if (!cpf.valida()) {
          alert('CPF inválido.');
          bRetorno =  false;
        }
        return bRetorno;
    }

    onLoad();
});