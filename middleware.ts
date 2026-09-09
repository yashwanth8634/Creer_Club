import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

// Protect all /admin pages and admin API routes
export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/events/:path*", "/api/admin/:path*", "/api/registrations/:path*"],
};
