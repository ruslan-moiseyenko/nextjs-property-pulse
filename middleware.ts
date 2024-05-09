export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/properties/add", "/properties/save", "/profile", "/messages"],
};
