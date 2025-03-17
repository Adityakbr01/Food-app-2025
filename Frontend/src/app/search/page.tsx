"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, SearchIcon, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RestaurantCard } from "@/components/restourantCard"
import { MobileNavbar } from "@/components/Mobile-navBar"
import { CategoryPills } from "../category-pills"

// Sample data for search results
const restaurants = [
  {
    id: "1",
    name: "Spice Garden",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: 30,
    distance: "1.2 km",
  },
  {
    id: "2",
    name: "Pizza Paradise",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 40,
    distance: "0.8 km",
  },
  {
    id: "3",
    name: "Burger Barn",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww",
    cuisine: "American",
    rating: 4.3,
    deliveryTime: "15-25 min",
    deliveryFee: 35,
    distance: "1.5 km",
  },
  {
    id: "4",
    name: "Sushi Spot",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8fDA%3D",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: 50,
    distance: "2.0 km",
  },
  {
    id: "5",
    name: "Taco Town",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3xlbnwwfHwwfHx8MA%3D%3D",
    cuisine: "Mexican",
    rating: 4.2,
    deliveryTime: "20-30 min",
    deliveryFee: 45,
    distance: "1.8 km",
  },
  {
    id: "6",
    name: "Noodle House",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    cuisine: "Chinese",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 35,
    distance: "1.3 km",
  },
]

const dishes = [
  {
    id: "1",
    name: "Butter Chicken",
    restaurant: "Spice Garden",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
    price: "₹280",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    restaurant: "Pizza Paradise",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww",
    price: "₹250",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Cheeseburger",
    restaurant: "Burger Barn",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlYnVyZ2VyfGVufDB8fDB8fHww",
    price: "₹180",
    rating: 4.3,
  },
  {
    id: "4",
    name: "California Roll",
    restaurant: "Sushi Spot",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FsaWZvcm5pYSUyMHJvbGx8ZW58MHx8MHx8fDA%3D",
    price: "₹220",
    rating: 4.7,
  },
]

export default function page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)
  const [filteredDishes, setFilteredDishes] = useState(dishes)
  const [showClearButton, setShowClearButton] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    if (selectedCategory.endsWith("s")) {
        setSelectedCategory(selectedCategory.slice(0, -1));
      }
    
      let results = restaurants;
  
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i"); // ✅ Case-insensitive regex
      results = results.filter(
        (restaurant) => regex.test(restaurant.name) || regex.test(restaurant.cuisine)
      );
    }
  
    if (selectedCategory !== "All") {
      const categoryRegex = new RegExp(selectedCategory, "i"); // ✅ Case-insensitive regex
      results = results.filter(
        (restaurant) =>
          categoryRegex.test(restaurant.name) ||  // ✅ Name match
          categoryRegex.test(restaurant.cuisine) 
      );
    }
  
    console.log("Selected Category:", selectedCategory);
    console.log("Filtered Results:", results);
  
    setFilteredRestaurants(results);
  }, [searchTerm, selectedCategory]);
  
  

  const clearSearch = () => {
    setSearchTerm("")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants or dishes"
              className="pl-8 w-full pr-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {showClearButton && (
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={clearSearch}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="mb-6">
          <CategoryPills setSelectedCategory={setSelectedCategory} />
        </div>

        <Tabs defaultValue="restaurants">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="restaurants" className="flex-1">
              Restaurants
            </TabsTrigger>
            <TabsTrigger value="dishes" className="flex-1">
              Dishes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="restaurants">
            {filteredRestaurants.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredRestaurants.map((restaurant) => (
                  <motion.div key={restaurant.id} variants={item}>
                    <RestaurantCard
                      name={restaurant.name}
                      image={restaurant.image}
                      cuisine={restaurant.cuisine}
                      rating={restaurant.rating}
                      deliveryTime={restaurant.deliveryTime}
                      deliveryFee={restaurant.deliveryFee}
                      distance={restaurant.distance}
                      
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No restaurants found matching "{searchTerm}"</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="dishes">
            {filteredDishes.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredDishes.map((dish) => (
                  <motion.div
                    key={dish.id}
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link href={`/restaurant/${dish.id}`} className="block">
                      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-48 w-full">
                          <img
                            src={dish.image || "/placeholder.svg"}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="font-semibold text-white">{dish.name}</h3>
                            <p className="text-white/80 text-sm">{dish.restaurant}</p>
                          </div>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                          <span className="font-medium">{dish.price}</span>
                          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">
                            <svg className="w-3 h-3 fill-green-700" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {dish.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No dishes found matching "{searchTerm}"</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <MobileNavbar />
    </div>
  )
}

