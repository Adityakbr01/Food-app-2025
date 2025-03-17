"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MobileNavbar } from "@/components/Mobile-navBar"

export default function page() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 bg-background z-10 border-b">
        <div className="container flex items-center h-16 px-4">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-semibold">Track Order</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <motion.div
              className="bg-rose-50 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-semibold">Spice Garden</h2>
                  <p className="text-sm text-muted-foreground">Order #FE12345</p>
                </div>
                <motion.div
                  className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                  }}
                >
                  <Clock className="h-3 w-3" />
                  <span>On the way</span>
                </motion.div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Estimated delivery: 3:05 PM</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" size="sm">
                    <Phone className="mr-1 h-3 w-3" />
                    Call Restaurant
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
                  <motion.div className="relative pl-10" variants={item}>
                    <motion.div
                      className="absolute left-2 w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-50"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    ></motion.div>
                    <h3 className="font-medium">Order Confirmed</h3>
                    <p className="text-sm text-muted-foreground">2:30 PM</p>
                  </motion.div>
                  <motion.div className="relative pl-10" variants={item}>
                    <motion.div
                      className="absolute left-2 w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-50"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                    ></motion.div>
                    <h3 className="font-medium">Order Prepared</h3>
                    <p className="text-sm text-muted-foreground">2:45 PM</p>
                  </motion.div>
                  <motion.div className="relative pl-10" variants={item}>
                    <motion.div
                      className="absolute left-2 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-50"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                    ></motion.div>
                    <h3 className="font-medium">Out for Delivery</h3>
                    <p className="text-sm text-muted-foreground">2:50 PM</p>
                    <motion.div
                      className="mt-2 flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                        <Image
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D"
                          alt="Delivery Partner"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Rahul S.</p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          Contact
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                  <motion.div className="relative pl-10" variants={item}>
                    <motion.div
                      className="absolute left-2 w-2 h-2 rounded-full bg-muted-foreground/20 ring-4 ring-muted"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                    ></motion.div>
                    <h3 className="font-medium text-muted-foreground">Delivered</h3>
                    <p className="text-sm text-muted-foreground">Estimated: 3:05 PM</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="bg-muted/30 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <h3 className="font-medium mb-2">Delivery Address</h3>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm">123 Main Street, Apartment 4B, Cityville, State, 12345</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="md:w-80"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <motion.div className="flex gap-3" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="w-5 text-center">1×</div>
                <div className="flex-1">
                  <p className="font-medium">Butter Chicken</p>
                  <p className="text-sm text-muted-foreground">₹280</p>
                </div>
              </motion.div>
              <motion.div className="flex gap-3" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="w-5 text-center">1×</div>
                <div className="flex-1">
                  <p className="font-medium">Paneer Tikka Masala</p>
                  <p className="text-sm text-muted-foreground">₹240</p>
                </div>
              </motion.div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹520</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹30</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹20</span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹28.5</span>
              </div>
            </div>
            <Separator className="my-4" />
            <motion.div
              className="flex justify-between font-medium"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                repeat: 3,
                duration: 0.8,
                delay: 1.5,
              }}
            >
              <span>Total</span>
              <span>₹598.5</span>
            </motion.div>
            <div className="mt-4 text-sm">
              <p className="font-medium">Payment Method</p>
              <p className="text-muted-foreground">Paid via UPI</p>
            </div>
          </motion.div>
        </div>
      </main>

      <MobileNavbar />
    </div>
  )
}

