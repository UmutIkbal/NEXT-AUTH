export const LOGIN = "/login"

export const PUBLIC_ROUTES = [
    '/login',
    '/register',
    'protected',
    "/api/auth/callback/google"
]

export const ROOT = "/"

export const PROTECTED_SUB_ROUTES = [
    "/dashboard"
    //buraya sub routelara erişilmemesi için route ekle 
    //biz public route kodu yazarken /api ile başlayan herşey public route'tur dedik ama mesela 
    //public route olmasını istemediğimiz bir subroute var /api/passwords gibi falan onu engellemek için burası lazım işte
]