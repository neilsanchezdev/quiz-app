import { Logo } from "@/components/logo"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4 bg-primary">
                <Logo className="w-12 h-12" />
            </div>
        </nav>
    )
}
