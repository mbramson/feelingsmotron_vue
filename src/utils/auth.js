const JWT_TOKEN_KEY = 'jwt_token';

export function getJwtToken() {
  return localStorage.getItem(JWT_TOKEN_KEY);
}

export function isLoggedIn() {
  const jwtToken = getJwtToken();
  return !!jwtToken;
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

export function setJwtToken(token) {
  localStorage.setItem(JWT_TOKEN_KEY, token);
}

export function clearJwtToken() {
  localStorage.removeItem(JWT_TOKEN_KEY);
}
