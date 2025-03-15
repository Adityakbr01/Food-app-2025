"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    rating: 5,
    text: "FoodExpress has completely changed how I order food. The app is so easy to use, and the delivery is always on time. I love the variety of restaurants available!",
  },
  {
    id: "2",
    name: "Rahul Patel",
    location: "Delhi",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    rating: 4,
    text: "I've been using FoodExpress for over a year now, and I'm consistently impressed with their service. The food always arrives hot, and the delivery partners are very professional.",
  },
  {
    id: "3",
    name: "Ananya Gupta",
    location: "Bangalore",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    rating: 5,
    text: "The tracking feature is amazing! I can see exactly where my food is and when it will arrive. Plus, the customer service is top-notch whenever I've had any issues.",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl bg-gray-50 dark:bg-black  p-8 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage src={testimonials[current].avatar} alt={testimonials[current].name} />
                <AvatarFallback>{testimonials[current].name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < testimonials[current].rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl font-medium mb-6">"{testimonials[current].text}"</blockquote>

            <div className="font-semibold">{testimonials[current].name}</div>
            <div className="text-sm text-muted-foreground">{testimonials[current].location}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => {
              setAutoplay(false)
              setCurrent(index)
            }}
            className={`w-2 h-2 p-0 rounded-full ${current === index ? "bg-rose-500" : "bg-gray-300"}`}
          />
        ))}
        <Button variant="outline" size="icon" onClick={next} className="rounded-full">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

