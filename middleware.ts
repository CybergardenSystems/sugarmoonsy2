import { NextResponse, type NextRequest } from "next/server";

/**
 * Exakt-case 301 für die Legacy-URL `/Bio-Zertifizierung`.
 *
 * Bewusst NICHT über `redirects()` in next.config: dort matchen Sources
 * case-insensitiv, wodurch die Regel auch die Zielroute
 * `/bio-zertifizierung` träfe und eine 301-Endlosschleife erzeugte
 * (Council Runde 1, Blocker B1). Zur Sicherheit gegen case-insensitives
 * Matcher-Verhalten ist die Bedingung invertiert: exakt das Ziel wird
 * immer durchgelassen.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/bio-zertifizierung") {
    const url = request.nextUrl.clone();
    url.pathname = "/bio-zertifizierung";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/Bio-Zertifizierung",
};
