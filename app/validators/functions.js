'use strict'
// Retorna si el largo de un string está dentro del rango establecido
const stringLen = function (strParam, upper, lower = 0) {
  var strLen = strParam.toString().length
  if (strLen >= lower && strLen <= upper) {
    return true
  } else {
    return false
  }
}

// Retorna si un valor numérico se encuentra dentro de los límites establecidos
const numericLim = function (numParam, upper = undefined, lower = undefined) {
  if (isNaN(numParam)) {
    return false
  }

  if (upper === undefined && lower === undefined) { // Sin límites => Siempre TRUE
    return true
  } else if (upper === undefined) { // Sólo límite inferior
    if (numParam >= lower) {
      return true
    } else {
      return false
    }
  } else if (lower === undefined) { // Sólo límite superior
    if (numParam <= upper) {
      return true
    } else {
      return false
    }
  } else {
    if(numParam <= upper && numParam >= lower) { // Ambos límites
      return true
    }
    else {
      return false
    }
  }
}

export {
  stringLen,
  numericLim
}
