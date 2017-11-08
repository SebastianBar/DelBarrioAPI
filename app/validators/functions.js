// Retorna si el largo de un string está dentro del rango establecido
function stringLen (strParam, upper, lower = 0) {
  var strLen = strParam.toString().length
  
  return (strLen >= lower && strLen <= upper)
}

// Retorna si un valor numérico se encuentra dentro de los límites establecidos
function numericLim (numParam, upper = undefined, lower = undefined) {
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
