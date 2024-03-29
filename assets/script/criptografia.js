function criptografia(texto) {
    let separadorTexto = texto.split('');
    
    separadorTexto.forEach(function(caracter, i) {
        switch (caracter) {
            case 'e':
                separadorTexto[i] = 'enter';
                break;
            case 'i':
                separadorTexto[i] = 'imes';
                break;
            case 'a':
                separadorTexto[i] = 'ai';
                break;
            case 'o':
                separadorTexto[i] = 'ober';
                break;
            case 'u':
                separadorTexto[i] = 'ufat';
                break;
        }
    });

    mostraResposta('resposta', separadorTexto.join(''));
}

function descriptografia(texto) {
    let descriptografia = [
        ["a", "ai"], 
        ["e", "enter"], 
        ["i", "imes"], 
        ["o", "ober"], 
        ["u", "ufat"]
    ];

    for (let i = 0; i < descriptografia.length; i++) {
        if (texto.includes(descriptografia[i][1])) {
            texto = texto.replaceAll(descriptografia[i][1], descriptografia[i][0]);
        }
    }

    mostraResposta('resposta', texto);
}

function validado(texto, operacao) {
    let parametros = /[A-Z-À-Ú-à-ú]/;

    if (texto === '') {
        erroTextoVazio();
    } else if (!parametros.test(texto)) {
        if (operacao === 'criptografar') {
            criptografia(texto);
        } else if (operacao === 'descriptografar') {
            descriptografia(texto);
        }
    } else {
        erroCaracteresInvalidos();
    }
}

function erroCaracteresInvalidos() {
    mostraResposta('resposta', 'Apenas letras minúsculas e com acento são permitidas!');
}

function erroTextoVazio() {
    mostraResposta('resposta', 'Digite um texto que você deseja criptografar ou descriptografar.');
}

function mostraResposta(tag, texto) {
    let campo = document.getElementById(tag);
    campo.innerHTML = texto;
}

function btnCriptografar() {
    let texto = document.querySelector('.entrada__texto').value;
    validado(texto , 'criptografar');
    rola('.btn__copiar');
    desativDivIncial();
}

function btnDescriptografar() {
    let texto = document.querySelector('.entrada__texto').value;
    validado(texto , 'descriptografar');
    rola('.btn__copiar');
    desativDivIncial();
}

function btnCopiar() {
    let texto = document.getElementById('resposta').value;
    navigator.clipboard.writeText(texto)
        .then(() => {
            console.log('Texto copiado para a área de transferência.');
            location.reload();
        })
        .catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
}

function removerSeletor(id, classe) {
    let elemento = document.getElementById(id);
    elemento.classList.remove(classe);
}

function rola(tag) {
    document.querySelector(tag).scrollIntoView({behavior:'smooth'});
}

function desativDivIncial() {
    document.getElementById("img_res").style.display = "none";
    document.getElementById("texto_res").style.display = "none";
    document.getElementById("p_res").style.display = "none";
    removerSeletor('copiar', 'desativado');
    removerSeletor('resposta', 'desativado');
}
