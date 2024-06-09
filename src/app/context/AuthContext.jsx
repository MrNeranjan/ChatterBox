'use client';

import { SessionProvider } from "next-auth/react";

// Ensure you are passing the session to SessionProvider
export default function AuthContext({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}