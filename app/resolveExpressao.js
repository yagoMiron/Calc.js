/*
const prompt = require('prompt-sync')();

const expressaoMatematica = prompt("Escreva uma expressão matemática ");
console.time('meu timer');
const resultado = resolveExpressao(expressaoMatematica);
console.log("O resultado é: " + resultado);
console.timeEnd('meu timer');
*/


function resolveExpressao(expressao) {
    // 9+9-9+9*9-9*9+9%+9/9*9/9+9-9
    console.log(expressao)
    let arrayExpressao = expressao.split('')
    let indexAbreParenteses = arrayExpressao.findIndex((element) => element == '(')
    if (indexAbreParenteses != -1) {
        expressao = resolveParenteses(expressao);
        expressao = expressao.join('');
    }
    arrayExpressao = expressao.split("-");
    // ["9+9","9+9*9","9*9+9%+9/9*9/9+9","9"]
    stringExpressao = arrayExpressao.join("+-")
    // "9+9+-9+9*9+-9*9+9%+9/9*9/9+9+-9"
    arrayExpressao = stringExpressao.split("%");

    stringExpressao = arrayExpressao.join("÷100");
    // "9+9+-9+9*9+-9*9+9/100+9/9*9/9+9+-9"
    arrayExpressao = stringExpressao.split("mod");

    stringExpressao = arrayExpressao.join("%")

    arrayExpressao = stringExpressao.split("+");
    // ["9","9","-9","9*9","-9*9","9/9*9/9","9","-9"]
    arrayExpressao = arrayExpressao.map((element) => {
        if (Number(element)) {
            return element;
        } else {
            let arrayElement = element.split("%");
            // ["9","9","-9",["9","9"],["-9","9"],["9/9","9/9"],"9","-9"]
            // "9/9*9/9" => ["9/9","9/9"]
            arrayElement = arrayElement.map((element) => {
                if (Number(element)) {
                    return element;
                } else {
                    let arrayElement = element.split("x");
                    // ["9","9","-9",["9","9"],["-9","9"],["9/9","9/9"],"9","-9"]
                    // "9/9*9/9" => ["9/9","9/9"]
                    arrayElement = arrayElement.map((element) => {
                        if (Number(element)) {
                            return element;
                        } else {
                            let arrayElement = element.split("÷");
                            // ["9","9","-9",["9","9"],["-9","9"],[["9","9"],["9","9"]],"9","-9"]
                            // "9/9" => ["9","9"]

                            arrayElement = arrayElement.map((element) => {
                                if (Number(element)) {
                                    return element;
                                } else {
                                    let arrayElement = element.split("^");
                                    arrayElement = arrayElement.map((element) => {
                                        if (Number(element)) {
                                            return element;
                                        } else {
                                            let arrayElement = element.split("√");
                                            const result = retornaRaizes(arrayElement);
                                            return result;
                                        }
                                    })

                                    const result = exponenciaElementos(arrayElement);
                                    return result;
                                }
                            })

                            const result = dividirElementos(arrayElement);
                            // ["9","9"] => "1"
                            return result;
                        }
                    });
                    // ["9","9","-9",["9","9"],["-9","9"],["1","1"],"9","-9"]
                    const resultMultiplicacao = multiplicaElementos(arrayElement);
                    return resultMultiplicacao;
                }
            });
            // ["9","9","-9",["9","9"],["-9","9"],["1","1"],"9","-9"]
            const resultMultiplicacao = retornaResto(arrayElement);
            return resultMultiplicacao;
        }
    });
    // ["9","9","-9","81","-81","1","9","-9"]
    const resultado = somarElementos(arrayExpressao);
    // 10
    let result = (Math.floor(resultado * 100000000000000)) / 100000000000000
    return result;
}
function multiplicaElementos(arrayMult) {
    // retorna o produto da Multiplicação todos os elementos de um array
    const result = arrayMult.reduce(function (acc, element) {
        return acc * element;
    }, 1);
    return result;
}
function dividirElementos(arrayDiv) {
    //retorna o quociente da dividão de todos os elementos de um array
    const result = arrayDiv.reduce(function (acc, element) {
        return acc / element;
    });
    return result
}
function somarElementos(arraySoma) {
    // retorna a soma de todos os elementos de um array
    const result = arraySoma.reduce((acc, element) => {
        return Number(acc) + Number(element);
    });
    return result
}
function exponenciaElementos(arrayExponencial) {
    const result = arrayExponencial.reduce((acc, element) => {
        return Number(acc) ** Number(element);
    });
    return result
}
function retornaRaizes(arrayRaiz) {
    const result = arrayRaiz.reduce((acc, element) => {
        if (acc == "") {
            return Number(element) ** (1 / 2);
        } else {
            return Number(element) ** (1 / Number(acc));
        }
    });
    return result
}
function resolveParenteses(expressao) {
    let arrayExpressao = expressao.split('')
    let indexAbreParenteses = arrayExpressao.findIndex((element) => element == '(')
    let indexFechaParenteses = arrayExpressao.findIndex((element) => element == ')')
    let expressaoInterna = arrayExpressao.slice(indexAbreParenteses + 1, indexFechaParenteses)
    let stringExpressao = expressaoInterna.join('');
    const resultExpressaoInterna = resolveExpressao(stringExpressao)
    arrayExpressao.splice(indexAbreParenteses, (indexFechaParenteses - indexAbreParenteses + 1), resultExpressaoInterna)
    return arrayExpressao
}
function retornaResto(arrayDiv) {
    //retorna o resto da dividão de todos os elementos de um array
    const result = arrayDiv.reduce(function (acc, element) {
        return acc % element;
    });
    return result
}