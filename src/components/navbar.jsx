'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser, logoutUser } from "@/utils/auth";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setLoggedIn(true);
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    setUsername("");
    window.location.href = "/";
  };

  const publicNavItems = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Blog", href: "/blog" },
  ];

  const userNavItems = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Blog", href: "/blog" },
  ];

  const navItems = loggedIn ? userNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Logo */}
        <Link href={loggedIn ? "/user/dashboard" : "/"} className="flex items-center">
          <span className="text-xl font-semibold tracking-tight">minimal</span>
          <span className="text-xl font-semibold text-primary">.</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ? "text-primary" : "hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth section */}
        <div className="flex items-center gap-4">
          {loggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User avatar" />
                  <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:block font-medium">{username}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                aria-label="Log out"
              >
                Log out
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <MobileMenu navItems={navItems} loggedIn={loggedIn} onClose={() => setIsOpen(false)} />
        </>
      )}
    </header>
  );
};

function MobileMenu({ navItems, loggedIn, onClose }) {
  return (
    <nav className="fixed top-16 left-0 right-0 z-50 bg-background px-6 pb-6 pt-4 shadow-lg lg:hidden max-h-[calc(100vh-4rem)] overflow-auto">
      <div className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="-mx-4 block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        <div className="pt-4">
          {loggedIn ? (
            <Button variant="outline" className="w-full" asChild>
              <Link href="/user/profile">Account</Link>
            </Button>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
