"use client"
import Link from "next/link"
import { Triangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ModeToggle } from "./ModeToggle";
import { signOut } from "next-auth/react"


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
    <nav className="">
      <header className="flex items-center justify-between px-4 py-2 border-b ">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
          {/* change this */}
          
            <Triangle className="h-5 w-5" color="orange"/>
          </Link>
          <Link href='/dashboard' className="flex items-center">
            <div className="h-5 w-5 rounded-full bg-green-500 mr-2"></div>
            <span className="font-medium">{user.name}'s works</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 flex items-cente">
                <AvatarFallback className=" bg-pink-400">{user?.name?.charAt(0)}</AvatarFallback>
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
      </header>
    </nav>
  );
}
