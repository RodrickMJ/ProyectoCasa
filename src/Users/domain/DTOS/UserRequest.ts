export interface UserRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserCreateRequest extends UserRequest {
    nombre: string;
    rol?: 'estudiante' | 'docente' | null;
}
