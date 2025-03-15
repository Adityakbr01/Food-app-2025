"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function NewsletterSection() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-primary/10 p-8 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h2>
          <p className="text-muted-foreground mb-6">Get the latest updates on new products and upcoming sales</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button className="cursor-pointer">Subscribe</Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

