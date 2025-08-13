import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(req) {
    return await updateSession(req);
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth/confirm|auth/error|opt-in|opt-in/privacy-policy|opt-in/terms-of-service).*)",
    ],
};
