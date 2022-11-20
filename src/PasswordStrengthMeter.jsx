import React from 'react'; 
import zxcvbn from 'zxcvbn';

function PasswordStrengthMeter({password}) {
    const testPassword = zxcvbn(password || "")

    const createPasswordLabel = (testPassword) => { 
        switch(testPassword.score) { 
            case 0, 1: 
                return 'Weak'; 
            case 2:
                return 'Fair'; 
            case 3: 
                return 'Good'; 
            case 4:
                return 'Strong'; 
            default:
                return 'Weak'
        }
    }
    
  return (
    <div>
        <progress value={testPassword.score} max='4'></progress>
        <label>{createPasswordLabel(testPassword)}</label>
    </div>
  )
}

export default PasswordStrengthMeter