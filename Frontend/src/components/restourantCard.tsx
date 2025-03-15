"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Star } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RestaurantCardProps {
  name: string
  image: string
  cuisine: string
  rating: number
  deliveryTime: string
  deliveryFee: number
  distance: string
  id: string
  location: string
}

export function RestaurantCard({
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  distance,
  id,
  location
}: RestaurantCardProps) {
  return (
    <Link
    href={`/restaurant/${id}`}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="overflow-hidden max-h-[400px] pt-0 h-[400px] hover:shadow-md transition-shadow">
          <div className="relative h-full w-full">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover h-full w-full" />
            <Badge variant={"outline"} className="absolute top-2 right-2  flex items-center gap-1 bg-green-50 text-red-700 px-1.5 py-0.5 rounded text-xs font-medium">
            ₹ {deliveryFee} delivery
            </Badge>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              <motion.div
                className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Star className="h-3 w-3 fill-green-700 text-green-700" />
                {rating}
              </motion.div>
            </div>
            <p className="text-muted-foreground text-sm">{location}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {deliveryTime}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {distance}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}

