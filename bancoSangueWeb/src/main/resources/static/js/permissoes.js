$(document).ready(function() {

    var registrosFuncionario = [
        { id : 1, nome : 'João Silva', cpf : 97745930065, permissao : 0, permissaoDescricao : 'Comum' },
        { id : 2, nome : 'Maria Aparecida', cpf : 42490919024, permissao : 0, permissaoDescricao : 'Comum' },
        { id : 3, nome : 'Quitéria Santana', cpf : 71221275089, permissao : 1, permissaoDescricao : 'Especial' },
        { id : 4, nome : 'Iguim Linguissa', cpf : 49833457010, permissao : 2, permissaoDescricao : 'Administrador' },
        { id : 5, nome : 'Ana Paula de Sousa', cpf : 66859437006, permissao : 2, permissaoDescricao : 'Administrador' },
        { id : 6, nome : localStorage.getItem('nomeUsuario'), cpf : localStorage.getItem('cpfUsuario'), permissao : 2, permissaoDescricao : 'Administrador' }
    ];

    function onLoad() {
        atualizaTabelaFuncionarios();
        imprimeNomeUsuario();
        $('table tbody tr').removeClass('linhaSelecionada');

        $("#relatarProblema").click(function() {
            const myModal = new bootstrap.Modal('#meuModal', { }); 
            myModal.show();
        });

        $('#cadastrarFuncionario').click(function() {
            const myModal = new bootstrap.Modal('#modalCadastrarFuncionario', { }); 
            myModal.show();
        });

        $('#alterarFuncionario').click(function() {
            if (existeLinhaSelecionadaTabela()) {
                const myModal = new bootstrap.Modal('#modalAlterarFuncionario', { }); 
                myModal.show();
                onLoadModalAlterarFuncionario();
            }
        });

        $('#excluirFuncionario').click(function() {
            if (existeLinhaSelecionadaTabela()) {
                const myModal = new bootstrap.Modal('#modalExcluirFuncionario', { }); 
                myModal.show();
            }
        });
        
        $('#insereFuncionario').click(cadastrarFuncionario);
        $('#alteraFuncionario').click(alterarFuncionario);
        $('#confirmarExclusaoFuncionario').click(excluirFuncionario);
    }

    function imprimeNomeUsuario() {
        let nomeUsuario = localStorage.getItem('nomeUsuario');
        if (nomeUsuario) {
            $('#nomeUsuario').text(nomeUsuario + ' (Administrador)');
        }
    }

    function atualizaTabelaFuncionarios() {
        let bodyTabelaFuncionario = $('#tabelaFuncionarios tbody');

        bodyTabelaFuncionario.html('');
        registrosFuncionario.forEach(funcionario => {
            bodyTabelaFuncionario.append(
                '<tr>' +
                  '<td class="idFuncionario">' + funcionario.id + '</td>' +
                  '<td>' + funcionario.nome + '</td>' +
                  '<td>' + trataCpf(funcionario.cpf.toString(), false) + '</td>' +
                  '<td>' + funcionario.permissaoDescricao + '</td>' +
                '</tr>'
              ); 
        });
        $('table tbody tr').click(setLinhaSelecionadaTabela);
    }

    function cadastrarFuncionario() {
        if (validaCampos(true)) {
            let funcionario = {
                id                 : registrosFuncionario.length + 1,
                nome               : $('#nomeCadastrar').val(), 
                cpf                : trataCpf($('#cpfCadastrar').val(), true),
                permissao          : parseInt($('#permissaoCadastrar').val()),
                permissaoDescricao : getPermissaoByCodigo(parseInt($('#permissaoCadastrar').val()))
            };
            registrosFuncionario.push(funcionario);
            limpaCampos('');
            $('#modalCadastrarFuncionario').modal('hide');
            alert('Funcionário cadastrado com sucesso.');
        }
        atualizaTabelaFuncionarios();
    }

    function alterarFuncionario() {
        if (validaCampos(false)) {
            let idFuncionario = localStorage.getItem('idFuncionarioSelecionado');
            registrosFuncionario.forEach(funcionario => {
                if (funcionario.id == idFuncionario) {
                    funcionario.nome = $('#nomeAlterar').val();
                    funcionario.cpf = trataCpf($('#cpfAlterar').val(), true);
                    funcionario.permissaoDescricao = getPermissaoByCodigo(parseInt($('#permissaoAlterar').val()));
                }
            });
            limpaCampos('');
            $('#modalAlterarFuncionario').modal('hide');
            alert('Funcionário alterado com sucesso.');
        }
        atualizaTabelaFuncionarios();
    }

    function excluirFuncionario() {
        let idFuncionario = localStorage.getItem('idFuncionarioSelecionado');
        registrosFuncionario = registrosFuncionario.filter((funcionario) => {
            return funcionario.id != idFuncionario
        });
        $('#modalExcluirFuncionario').modal('hide');
        alert('Funcionário excluido com sucesso.');
        atualizaTabelaFuncionarios();
    }

    function validaCampos(isCadastro) {
        let bRetorno = false;
        if (isCadastro) {
            switch (true) {
                case $('#nomeCadastrar').val() == '':
                    alert('Por favor, preencha o campo Nome.');
                    break;
                case $('#cpfCadastrar').val() == '':
                    alert('Por favor, preencha o campo CPF.');
                    break;
                default:
                    bRetorno = validaCPF($('#cpfCadastrar').val());
                    break;
            }
        } else {
            switch (true) {
                case $('#nomeAlterar').val() == '':
                    alert('Por favor, preencha o campo Nome.');
                    break;
                case $('#cpfAlterar').val() == '':
                    alert('Por favor, preencha o campo CPF.');
                    break;
                default:
                    bRetorno = validaCPF($('#cpfAlterar').val());
                    break;
            } 
        }

        return bRetorno;
    }

    function getPermissaoByCodigo(iCodigoPermissao) {
        let sRetorno = '';
        switch (iCodigoPermissao) {
            case 0:
                sRetorno = 'Comum';
                break;
            case 1:
                sRetorno = 'Especial';
                break;
            case 2:
                sRetorno = 'Administrador';
                break;
        }
        return sRetorno;
    }

    function validaCPF(sCpf) {
        let bRetorno = true;
        const cpf = new ValidaCPF(sCpf);
        if (!cpf.valida()) {
          alert('CPF inválido.');
          bRetorno =  false;
        }
        return bRetorno;
    }

    function trataCpf(cpf, bRemovePontuacao) {
        return (bRemovePontuacao) ? cpf.replace(/[^\d]/g, '') : cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    function setLinhaSelecionadaTabela() {
        $('table tbody tr').removeClass('linhaSelecionada');
        $(this).addClass('linhaSelecionada');
        localStorage.setItem('idFuncionarioSelecionado', $(this).find('.idFuncionario').text());
    }

    function existeLinhaSelecionadaTabela() {
        let bRetorno = false;
        if ($('.linhaSelecionada').length > 0) {
            bRetorno = true; 
        } else {
            alert('Selecione um registro para alterar.')
        }

        return bRetorno;
    }


    function limpaCampos() {
        $('input').val('');
    }

    function onLoadModalAlterarFuncionario() {
        let idFuncionario = localStorage.getItem('idFuncionarioSelecionado');
        registrosFuncionario.forEach(funcionario => {
            if (funcionario.id == idFuncionario) {
                $('#nomeAlterar').val(funcionario.nome);
                $('#cpfAlterar').val(trataCpf(funcionario.cpf.toString()), false);
                $('#permissaoAlterar').val(parseInt(funcionario.permissao));
            }
        });
    }

    onLoad();
});