// lib/route-utils.ts
export function checkIsUserRoute(pathname: string) {
  return pathname.startsWith('/user')
}

export function checkIsAdminRoute(pathname: string) {
  return pathname.startsWith('/admin')
}