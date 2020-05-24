// DOM elements
const encryptBtn = document.getElementById('encrypt');
const decryptBtn = document.getElementById('decrypt');

// Encrypt - Decrypt message
function crypt(deCrypt) {
  let key = document.getElementById('key').value;
  let message = document.getElementById('message');

  if (key.length === 0 || message.value.length === 0) {
    alert('-.- fill in all requiered fields -.-');
    return;
  }

  const codeKey = filterKey(key);

  if (deCrypt) {
    for (let i = 0; i < codeKey.length; i++) {
      codeKey[i] = (26 - codeKey[i]) % 26;
    }
  }

  message.value = cipher(message.value, codeKey);

  //console.log('crypt', key, message.value, deCrypt, codeKey);
}

// Vigenere cipher encryptation decriptation
function cipher(input, key) {
  let output = '';
  for (let i = 0, j = 0; i < input.length; i++) {
    let c = input.charCodeAt(i);
    if (isUppercase(c)) {
      output += String.fromCharCode(((c - 65 + key[j % key.length]) % 26) + 65);
      //console.log(output);
      j++;
      //console.log(j);
    } else if (isLowercase(c)) {
      output += String.fromCharCode(((c - 97 + key[j % key.length]) % 26) + 97);
      j++;
    } else {
      output += input.charAt(i);
    }
  }
  return output;
}

// Filter key and transform it to unicode
function filterKey(key) {
  let result = [];

  for (let i = 0; i < key.length; i++) {
    let c = key.charCodeAt(i);

    if (isLetter(c)) {
      result.push((c - 65) % 32);
    }
  }
  //console.log(result);
  return result;
}

// Check if character code is a letter
function isLetter(c) {
  return isUppercase(c) || isLowercase(c);
}

function isUppercase(c) {
  return 65 <= c && c <= 90;
}

function isLowercase(c) {
  return 97 <= c && c <= 122;
}

// Event listeners
encryptBtn.addEventListener('click', (e) => {
  e.preventDefault();
  crypt(false);
});
decryptBtn.addEventListener('click', (e) => {
  e.preventDefault();
  crypt(true);
});
