"use client"

import { BeefIcon as Burger, Coffee, Pizza, Salad, Soup, Utensils } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const categories = [
  {
    name: "All",
    icon: Utensils,
  },
  {
    name: "Pizza",
    icon: Pizza,
  },
  {
    name: "Burgers",
    icon: Burger,
  },
  {
    name: "Salads",
    icon: Salad,
  },
  {
    name: "Soups",
    icon: Soup,
  },
  {
    name: "Beverages",
    icon: Coffee,
  },
]

interface CategoryPillsProps {
  setSelectedCategory: (category: string) => void;
}

export function CategoryPills({ setSelectedCategory }: CategoryPillsProps) {

  const [selectedCategory, setSelectedCategoryState] = useState<string>("");

  useEffect(() => {
    setSelectedCategoryState("All");
  }, [setSelectedCategory]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryState(categoryName);
    setSelectedCategory(categoryName === "All" ? "" : categoryName);
  };

  return (
    <div className="flex gap-3 hidescrollBar overflow-x-auto pb-2 py-6 -mx-4 px-4">
      {categories.map((category) => (
        <motion.button
          key={category.name}
          onClick={() => handleCategoryClick(category.name)}
          className={cn(
            "flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-colors",
            category.name === selectedCategory
              ? "bg-rose-50 border-rose-200 text-rose-600"
              : "hover:bg-muted",
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
            <category.icon className="h-4 w-4" />
          </motion.div>
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
