"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogPostCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
}

export function BlogPostCard({ title, excerpt, image, date, readTime, category }: BlogPostCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-96 flex flex-col pt-0">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-rose-500 text-white">{category}</Badge>
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{excerpt}</p>
          <motion.div
            className="flex items-center text-sm font-medium cursor-pointer text-rose-500 mt-auto"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

