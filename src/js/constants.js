
export const ROL_ADMIN = 1;
export const ROL_VETERINARIO = 2;
export const ROL_CLIENTE = 3;

//DEFINIR URLS ACA
//MICROSERVICIO HISTORIA CLINICA
export const URL_API_HISTORIA_BASE = 'https://localhost:44314/api';
export const URL_API_CLIENTE = URL_API_HISTORIA_BASE + '/Cliente';
export const URL_API_TURNO = URL_API_HISTORIA_BASE + '/Turno';
export const URL_API_HISTORIA_CLINICA = '/HistoriaClinica';
export const URL_API_REGISTROS = URL_API_HISTORIA_BASE + '/Registros';
export const URL_API_TRATAMIENTO = URL_API_HISTORIA_BASE + '/Tratamiento';
export const URL_API_MASCOTA = URL_API_HISTORIA_BASE + '/Mascota';

//MICROSERVICIO AUTENTICACION
export const URL_API_LOGIN = 'https://localhost:44315/api/login';
export const URL_API_REGISTER = 'https://localhost:44315/api/register';
