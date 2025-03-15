"use client"

import Link from "next/link"
import { Home, Search, ShoppingBag, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function MobileNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 text-xs w-1/4 h-full ${isActive("/") ? "text-rose-500" : "text-muted-foreground"}`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Home className="h-5 w-5" />
          </motion.div>
          <span>Home</span>
        </Link>
        <Link
          href="/search"
          className={`flex flex-col items-center justify-center gap-1 text-xs w-1/4 h-full ${isActive("/search") ? "text-rose-500" : "text-muted-foreground"}`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Search className="h-5 w-5" />
          </motion.div>
          <span>Search</span>
        </Link>
        <Link
          href="/orders"
          className={`flex flex-col items-center justify-center gap-1 text-xs w-1/4 h-full ${isActive("/orders") || pathname.startsWith("/orders/") ? "text-rose-500" : "text-muted-foreground"}`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ShoppingBag className="h-5 w-5" />
          </motion.div>
          <span>Orders</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center gap-1 text-xs w-1/4 h-full ${isActive("/profile") ? "text-rose-500" : "text-muted-foreground"}`}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <User className="h-5 w-5" />
          </motion.div>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  )
}

