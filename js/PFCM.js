let boton = document.getElementById('boton-pfcs');
let botonN = document.getElementById('btnRespuestaPn');
let FormularioRespuesta = document.getElementById('formulario_respuestas');
document.getElementById("formulario_respuestas").style.visibility = "hidden";

boton.onclick = function () {
    let lambda = parseFloat(document.getElementById("lambda").value);
    let miu = parseFloat(document.getElementById("miu").value);
    let servidor = parseInt(document.getElementById("servidor").value);
    let poblacion = parseInt(document.getElementById("poblacion").value);

    if (isNaN(lambda) || isNaN(miu) || isNaN(servidor) || isNaN(poblacion)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    document.getElementById("formulario_respuestas").style.visibility = "visible";

    //Se llaman las funciones:
    let respuestaP0 = funcionP0(lambda, miu, poblacion, servidor);
    let respuestaPe = funcionPe(lambda, miu, poblacion, servidor, respuestaP0);
    let respuestaPne = 1 - respuestaPe;

    let respuestaL = funcionL(lambda, miu, poblacion, servidor, respuestaP0);
    let respuestaLq = funcionLq(lambda, miu, poblacion, servidor, respuestaP0);

    let respuestaLn = respuestaLq / respuestaPe;
    let respuestaWq = funcionWq(respuestaLq, poblacion, respuestaL, lambda);
    let respuestaW = funcionW(miu, respuestaWq);
    let respuestaWn = respuestaWq / respuestaPe;

    document.getElementById("respuestaL").innerHTML = respuestaL + " clientes";
    document.getElementById("respuestaP0").innerHTML = respuestaP0;
    document.getElementById("respuestaPe").innerHTML = respuestaPe;
    document.getElementById("respuestaPne").innerHTML = respuestaPne;

    document.getElementById("respuestaLq").innerHTML = respuestaLq + " clientes";
    document.getElementById("respuestaLn").innerHTML = respuestaLn + " clientes";
    document.getElementById("respuestaWq").innerHTML = respuestaWq + " h/c";
    document.getElementById("respuestaW").innerHTML = respuestaW + " h/c";
    document.getElementById("respuestaWn").innerHTML = respuestaWn + " h/c";

    botonN.onclick = function () {
        let num = parseInt(document.getElementById("valorN").value);

        if (isNaN(num)) {
            alert("Por favor, ingrese un valor válido para n.");
            return;
        }

        let respuestaPn = funcionPn(lambda, miu, poblacion, servidor, num, respuestaP0);
        document.getElementById("respuestaPn").innerHTML = respuestaPn;
    }
}

//Funcion para sacar el factorial de un número:
function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

var funcionP0 = function (lambda, miu, m, k) {
    let sumatoria = 0;
    let sumatoria2 = 0;
    let p0 = 0;

    for (let n = 0; n < k; n++) {
        sumatoria += (factorial(m) / (factorial(m - n) * factorial(n))) * Math.pow(lambda / miu, n);
    }

    for (let n = k; n <= m; n++) {
        sumatoria2 += (factorial(m) / (factorial(m - n) * factorial(k) * Math.pow(k, n - k))) * Math.pow(lambda / miu, n);
    }

    p0 = 1 / (sumatoria + sumatoria2);

    return p0;
}

var funcionPn = function (lambda, miu, m, k, n, p0) {
    let pn = 0;

    if (n >= 0 && n <= k) {
        pn = p0 * (factorial(m) / (factorial(m - n) * factorial(n))) * Math.pow(lambda / miu, n);
    } else {
        pn = p0 * (factorial(m) / (factorial(m - n) * factorial(k) * Math.pow(k, n - k))) * Math.pow(lambda / miu, n);
    }

    return pn;
}

var funcionPe = function (lambda, miu, m, k, p0) {
    let sumatoria = 0;

    for (let n = k; n <= m; n++) {
        sumatoria += p0 * (factorial(m) / (factorial(m - n) * factorial(k) * Math.pow(k, n - k))) * Math.pow(lambda / miu, n);
    }

    return sumatoria;
}

var funcionL = function (lambda, miu, M, k, p0) {
    let sum = 0;
    for (let n = 0; n <= M; n++) {
        let Pn = funcionPn(lambda, miu, M, k, n, p0);
        sum += n * Pn;
    }
    return sum;
}

var funcionLq = function (lambda, miu, m, k, p0) {
    let sumatoria = 0;

    for (let n = k; n <= m; n++) {
        sumatoria += (n - k) * p0 * (factorial(m) / (factorial(m - n) * factorial(k) * Math.pow(k, n - k))) * Math.pow(lambda / miu, n);
    }

    return sumatoria;
}

var funcionW = function (miu, wq) {
    return wq + (1 / miu);
}

var funcionWq = function (Lq, m, l, lambda) {
    return Lq / ((m - l) * lambda);
}
