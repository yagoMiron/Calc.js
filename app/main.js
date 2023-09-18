const botao = document.querySelectorAll('input.botao')
const input = document.querySelector('.input')
const expressao = document.querySelector('.expressao')


for (let i = 0; i < botao.length; i++) {
    botao[i].addEventListener("click", function () {
        let valor = botao[i].id

        if (valor == 'igual') {
            expressao.textContent= `${input.value} = `
            input.value = resolveExpressao(input.value)
        } else if (valor == 'apagar') {
            input.value = ''
        } else if (valor == 'pi') {
            input.value += '3.14159265';
        } else {
            console.log(botao[i].defaultValue)
            input.value += botao[i].defaultValue;
        }
    });
}