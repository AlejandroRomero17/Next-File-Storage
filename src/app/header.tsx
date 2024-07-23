'use client'; // Asegúrate de que este componente sea un componente del lado del cliente

import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/home');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative z-10 py-4 border-b bg-gray-50">
      <div className="container flex items-center justify-between mx-auto flex-wrap">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/xcaret.png"
            alt="TechHub TI Logo"
            width={150}
            height={150}
          />
          TechHub TI
        </Link>
        <div className="flex gap-2 mt-2 md:mt-0">
          <OrganizationSwitcher />
          <UserButton />
          <button onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
