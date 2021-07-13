export const sesion = localStorage.getItem('usuario')
  ? JSON.parse(localStorage.getItem('usuario'))
  : null;

export const logOut = () => {
  localStorage.removeItem('usuario');
  window.location.href = '/home';
};

export const getPayload = (token) => {
  return parseJwt(token);
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const getUser = () => {
  if (sesion) {
    const payload = getPayload(sesion.token);
    const user = JSON.parse(payload.User);
    return user
  }
}