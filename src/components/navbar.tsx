// components/Navbar.tsx
'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuTrigger,DropdownMenu, DropdownMenuItem, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { getCurrentUser, logoutUser } from '@/utils/auth';

interface NavbarProps {
  isLoggedIn?: boolean;
}

export const Navbar = (props: NavbarProps) => {
   const { isLoggedIn = false } = props;
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [username, setUsername] = useState('');

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
    setUsername('');
    window.location.href = '/';
  };

  const publicNavItems = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Blog", href: "/blog" },
  ]




  const userNavItems = [
    { name: "Dashboard", href: "/user/dashboard" },
    { name: "Profile", href: "/user/profile" },
    { name: "Settings", href: "/user/settings" },
  ]

  const navItems = isLoggedIn ? userNavItems : publicNavItems

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo */}
        <Link href={isLoggedIn ? "/user/dashboard" : "/"} className="flex items-center">
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
                pathname === item.href ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <UserDropdown username={username} onLogout={handleLogout} />
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href="/sign-in
              ">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <MobileMenu 
          navItems={navItems} 
          isLoggedIn={isLoggedIn} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </header>
  )
}

// Separate components for better organization
function UserDropdown({ username, onLogout }: { username: string; onLogout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="User" />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex flex-col items-start">
          <div className="text-xs font-medium">Signed in as</div>
          <div className="text-xs text-primary">{username}</div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 cursor-pointer"
          onClick={onLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileMenu({ navItems, isLoggedIn, onClose }: { 
  navItems: { name: string; href: string }[], 
  isLoggedIn: boolean, 
  onClose: () => void 
}) {
  return (
    <div className="lg:hidden">
      <div className="container space-y-4 px-4 pb-6 pt-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="-mx-4 block px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        <div className="pt-4">
          {isLoggedIn ? (
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
    </div>
  )
}