import React, {useState} from 'react'

const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '1234567890'
const symbols = '!@#$%^&*?/|~'

const PasswordGenerator = () => {
  const [password, setPassword] = useState(null);
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const makePassword = (e) => {
    e.preventDefault()
    let newPassword = "";

    let lower = 0, upper = 0, num = 0, sym = 0;
    if (includeLowercase) {
      lower = Math.ceil(passwordLength / 10);
    }
    if (includeUppercase) {
      upper = Math.ceil(passwordLength / 10);
    }

    if (includeNumbers) { 
        num = Math.ceil(passwordLength / 20)
    }

    if (includeSymbols) { 
        sym = Math.ceil(passwordLength / 5)
    }

    let remaining = passwordLength - (lower + upper + num + sym);

    while (lower > 0) {
      const char = getLowercaseLetters()
      newPassword = newPassword + char;
      lower--;
    }

    while (upper > 0) {
      const char = getUppercaseLetters()
      newPassword = newPassword + char;
      upper--;
    }

    while (num > 0) { 
        const char = getNumbers()
        newPassword = newPassword + char;
        num--;
    }

    while (sym > 0) {
        const char = getSymbols()
        newPassword = newPassword + char;
        sym--;
      }

    while (remaining > 0) {
      const char = getAnyCharacter();
      newPassword = newPassword + char;
      remaining--;
    }

    setPassword(randomizePassword(newPassword))
  }

  const getLowercaseLetters = () => { 
    const idx = Math.floor(Math.random() * lowercaseAlphabet.length);
    const char = lowercaseAlphabet.charAt(idx);
    return char
  }

  const getUppercaseLetters = () => { 
    const idx = Math.floor(Math.random() * uppercaseAlphabet.length);
    const char = uppercaseAlphabet.charAt(idx);
    return char;
  }

  const getNumbers = () => { 
    const idx = Math.floor(Math.random() * numbers.length);
    const char = numbers.charAt(idx);
    return char;
  }

  const getSymbols = () => { 
    const idx = Math.floor(Math.random() * symbols.length);
    const char = symbols.charAt(idx);
    return char;
  }

  const getAnyCharacter = () => { 
    const allChars = lowercaseAlphabet + uppercaseAlphabet + numbers + symbols;
    const idx = Math.floor(Math.random() * allChars.length);
    const char = allChars.charAt(idx);
    return char;
  }

  const randomizePassword = (password) => { 
    if (password.length === 0) return "";
    const idx = Math.floor(Math.random() * password.length);
    const arr = password.split("");
    const char = arr.at(idx);
    const remaining = [...arr.slice(0, idx), ...arr.slice(idx + 1)].join("");
    return char + randomizePassword(remaining);
  }


  return (
    <div>
      <h1>Password Generator</h1>
      {password ? <span>{password}</span> : <span>Please Generate a Password</span>}
      <form onSubmit={(e) => makePassword(e)}>
        <label htmlFor="password-length">Choose a password length:</label>
        <input id="password-length" name="password-length" type="number" step="1" value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />

        <label for="lowercase">Include Lowercase</label>
        <input id="lowercase" name="lowercase" type="checkbox" defaultChecked onClick={() => setIncludeLowercase((prev) => !prev)} />

        <label for="uppercase">Include Uppercase</label>
        <input id="uppercase" name="uppercase" type="checkbox" defaultChecked onClick={() => setIncludeUppercase((prev) => !prev)}/>

        <label for="numbers">Include Numbers</label>
        <input id="numbers" name="numbers" type="checkbox" defaultChecked onClick={() => setIncludeNumbers((prev) => !prev)}/>

        <label for="symbols">Include Symbols</label>
        <input id="symbols" name="symbols" type="checkbox" defaultChecked onClick={() => setIncludeSymbols((prev) => !prev)}/>
        {includeLowercase === false && includeUppercase === false && includeNumbers === false && includeSymbols === false ? <button type="submit" disabled >Generate Password</button>: <button type="submit">Generate Password</button>}
      </form>
    </div>
  )
}

export default PasswordGenerator