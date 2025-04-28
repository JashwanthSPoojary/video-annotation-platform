"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { ModeToggle } from "./ModeToggle"

type NavbarProps = {
  users: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | undefined;
};

export function Navbar({ users }: NavbarProps) {
  const user = users || {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <h1 className="text-xl font-bold">VideoAno</h1>
        </Link>
      </div>

      {/* Align ModeToggle and Profile to the right */}
      <div className="flex items-center space-x-4 ml-auto">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {/* Uncomment to use user image */}
                {/* <AvatarImage src={user.image} alt={user.name} /> */}
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
