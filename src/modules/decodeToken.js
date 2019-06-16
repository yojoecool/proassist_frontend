import decode from 'jwt-decode';

const assertAlive = (decoded) => {
  const now = Date.now().valueOf() / 1000;
  if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
    throw new Error(`token expired: ${JSON.stringify(decoded)}`);
  }
  if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
    throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`);
  }
};

export default () => {
  try {
    const decoded = decode(window.localStorage.getItem('proAssistToken'));
    assertAlive(decoded);

    return decoded;
  } catch (err) {
    window.localStorage.removeItem('proAssistToken');
    return null;
  }
};
