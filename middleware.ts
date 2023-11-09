export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/Menu', '/Inventario', '/Ajustes', '/Citas', '/Estadisticas', '/api/:path*']
}