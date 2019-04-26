export function saveJwtTokenOnTheStograte( token ) {
    return localStorage.setItem('user', token);
}