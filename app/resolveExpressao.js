function resolveExpressao(expressao) {
    let stringExpressao
    let arrayExpressao

    stringExpressao = resolveParenteses(expressao);

    //replaces {
    //arrayExpressao = stringExpressao.split(" ");
    //stringExpressao = arrayExpressao.join("")
    stringExpressao = stringExpressao.replace(/ /g, "");
    //arrayExpressao = stringExpressao.split("--");
    //stringExpressao = arrayExpressao.join("+")
    stringExpressao = stringExpressao.replace(/--/g, "+");
    //arrayExpressao = stringExpressao.split("-");
    //stringExpressao = arrayExpressao.join("+-")
    stringExpressao = stringExpressao.replace(/-/g, "+-");
    //arrayExpressao = stringExpressao.split("++");
    //stringExpressao = arrayExpressao.join("+")
    stringExpressao = stringExpressao.replace(/++/g, "+");
    //arrayExpressao = stringExpressao.split("%");
    //stringExpressao = arrayExpressao.join("÷100");
    stringExpressao = stringExpressao.replace(/%/g, "÷100");
    stringExpressao = stringExpressao.replace(/x/g, "*");
    // }

    arrayExpressao = stringExpressao.split("+");
    arrayExpressao = arrayExpressao.map((element) => {
        if (Number(element)) {
            return element;
        } else {
            let arrayElement = element.split("mod");
            arrayElement = arrayElement.map((element) => {
                if (Number(element)) {
                    return element;
                } else {
                    let arrayElement = element.split("*");
                    arrayElement = arrayElement.map((element) => {
                        if (Number(element)) {
                            return element;
                        } else {
                            let arrayElement = element.split("÷");
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
                            return result;
                        }
                    });
                    const resultMultiplicacao = multiplicaElementos(arrayElement);
                    return resultMultiplicacao;
                }
            });
            const resultMultiplicacao = retornaResto(arrayElement);
            return resultMultiplicacao;
        }
    });
    const resultado = somarElementos(arrayExpressao);

    let result = (Math.floor(resultado * 100000000000000)) / 100000000000000
    // corrigir erros de conversão de numeros binários

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
function resolveParenteses(expressaoString) {
    let direcao;
    let arrayExpressao = expressaoString.split('');
    const indexParenteses = arrayExpressao.findIndex((element) => {
        if (element == '(') {
            direcao = 'direita'
            return true
        } else if (element == ')') {
            direcao = 'esquerda'
            return true;
        } else {
            return false;
        }
    })
    if (direcao == 'direita') {
        const arrayCortado = arrayExpressao.slice(indexParenteses + 1);
        let stringExpressao = arrayCortado.join('');
        const resultExpressaoInterna = resolveParenteses(stringExpressao);
        arrayExpressao.splice(indexParenteses, arrayExpressao.length, resultExpressaoInterna);
        stringExpressao = arrayExpressao.join('');
        return stringExpressao;

    } else if (direcao == 'esquerda') {
        let arrayCortado = arrayExpressao.slice(0, indexParenteses);
        let stringExpressao = arrayCortado.join('');
        const resultExpressaoInterna = resolveExpressao(stringExpressao);
        arrayExpressao.splice(0, (indexParenteses + 1), resultExpressaoInterna);
        stringExpressao = arrayExpressao.join('');
        stringExpressao = resolveParenteses(stringExpressao);
        return stringExpressao;
        
    } else {
        return expressaoString
    }
}
function retornaResto(arrayDiv) {
    //retorna o resto da dividão de todos os elementos de um array
    const result = arrayDiv.reduce(function (acc, element) {
        return acc % element;
    });
    return result
}
