export function saveJwtTokenOnTheStograte( token ) {
    return sessionStorage.setItem('user', token);
}