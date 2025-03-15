import React from 'react'
import { motion } from "framer-motion"
import { Clock, MapPin, Star } from 'lucide-react'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

interface RecomendedItemCardProps {
  name: string;
  image: string;
  restaurant: string;
  rating: number;
  price: string;
  time: string;
  distance: string;
  match: string;
}

const RecomendedItemCard: React.FC<RecomendedItemCardProps> = ({ name, image, restaurant, rating, price, time, distance, match }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative rounded-lg overflow-hidden border bg-card hover:shadow-md transition-shadow cursor-pointer">
        <div className="absolute top-2 z-20 left-2 px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded-full">
          {match}
        </div>
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">
              <Star className="h-3 w-3 fill-green-700 text-green-700" />
              {rating}
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3">{restaurant}</p>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{price}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {distance}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RecomendedItemCard
