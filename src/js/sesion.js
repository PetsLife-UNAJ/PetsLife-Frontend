export const sesion = localStorage.getItem('usuario')
  ? JSON.parse(localStorage.getItem('usuario'))
  : null;

export const logOut = () => {
  localStorage.removeItem('usuario');
  window.location.href = window.origin;
};
