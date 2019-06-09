function validateEmail(email)  
{
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhoneNumber(num)  
{
    const digits = num.replace(/\D/g, '');
    return digits.length === 10;
}

function validatePassword(password,check)  
{
    return password === check;
}


export {validateEmail, validatePhoneNumber, validatePassword};