export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/menu', '/inventario', '/ajustes', '/citas', '/estadisticas', '/envios', '/expedientes', '/ventas']
}

// '/api/:path*'