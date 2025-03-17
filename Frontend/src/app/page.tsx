"use client"

import Link from "next/link"
import { ArrowRight, ChevronRight, Clock, MapPin, Quote, Search, ShoppingBag, Star, Utensils } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RestaurantCard } from "../components/restourantCard"
import { CategoryPills } from "./category-pills"
import { MobileNavbar } from "../components/Mobile-navBar"
import { ecommerceProducts, recommendedItems } from "@/utils/Constant"
import { useState } from "react"
import NewsletterSection from "@/components/NewsletterSection"
import Footer from "@/components/Footer"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { TestimonialCarousel } from "@/components/TestimonialCarousel"
import { BlogPostCard } from "@/components/BlogPostCard"
import RecomendedItemCard from "@/components/recomendedItemCard"

const ITEMS_PER_PAGE = 4; 



const blogPosts = [
  {
    id: "1",
    title: "10 Best Indian Dishes You Must Try",
    excerpt: "Explore the rich flavors and spices of traditional Indian cuisine with our top picks.",
    image:
      "https://images.unsplash.com/photo-1589778655375-3e622a9fc91c?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "May 15, 2023",
    readTime: "5 min read",
    category: "Food Guide",
  },
  {
    id: "2",
    title: "How to Eat Healthy While Ordering Takeout",
    excerpt: "Discover smart choices and tips for maintaining a balanced diet even when ordering delivery.",
    image:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    date: "June 2, 2023",
    readTime: "4 min read",
    category: "Healthy Eating",
  },
  {
    id: "3",
    title: "Behind the Scenes: A Day with Our Delivery Partners",
    excerpt: "Learn about the daily experiences and challenges faced by the people who deliver your favorite meals.",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMGRlbGl2ZXJ5fGVufDB8fDB8fHww",
    date: "June 18, 2023",
    readTime: "6 min read",
    category: "Stories",
  },
]


export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;

  const filteredProducts = ecommerceProducts.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : " ";
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });


  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

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
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-rose-500">
            <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.5 }}>
              <Utensils className="h-6 w-6" />
            </motion.div>
            <span>FoodExpress</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants or dishes"
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost">
              <MapPin className="mr-2 h-4 w-4" />
              <span>Set Location</span>
            </Button>
            <Link href={"auth/Register"}>  <Button className="cursor-pointer" variant="ghost">Register</Button> </Link>
            <Link href={"auth/Login"}><Button className="cursor-pointer">Login</Button></Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <motion.section
          className="bg-gradient-to-b from-[#ffe2e2]  to-white py-12 md:py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <motion.h1
                className="text-3xl md:text-4xl dark:text-black font-bold tracking-tight mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Delicious food delivered to your doorstep
              </motion.h1>
              <motion.p
                className="text-muted-foreground mb-6 dark:text-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Order from your favorite local restaurants with free delivery on your first order
              </motion.p>

            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Input placeholder="Enter your address" className="sm:flex-1 dark:bg-transparent border border-black placeholder:text-black darktext-black dark:py-5" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                <Button size="lg" className="cursor-pointer">Find Food</Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <section className="py-8">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Popular Categories</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <CategoryPills setSelectedCategory={setSelectedCategory} />
          </div>
        </section>

        <section className="py-8 mb-16">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Nearby Restaurants</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <motion.div
              className="grid relative pb-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {currentProducts.map((product, index) => (
                <motion.div variants={item} key={product.name}>
                  <RestaurantCard
                    name={product.name}
                    image={product.image}
                    cuisine="Indian"
                    rating={product.rating}
                    deliveryTime={product.deliveryTime}
                    deliveryFee={product.deliveryFee!}
                    distance="1.2 km"
                    key={product.name}
                    id={product.id}
                    location={product.location}
                  />
                </motion.div>
              ))}
              <div className="pagination w-full absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 justify-between md:justify-center items-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="px-4 py-2 cursor-pointer border rounded-lg"
                >
                  Previous
                </button>
                <span className="text-sm">Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="px-4 py-2 cursor-pointer border rounded-lg"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </div>
        </section>



        {/* Top Picks Section */}
        <motion.section
          className="py-12 bg-rose-50 dark:bg-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Recommended for You</h2>
                <p className="text-muted-foreground">Based on your taste preferences</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {recommendedItems.map((item, index) => (
                <RecomendedItemCard
                  key={index}
                  name={item.name}
                  image={item.image}
                  restaurant={item.restaurant}
                  rating={item.rating}
                  price={item.price}
                  time={item.time}
                  distance={item.distance}
                  match={item.match}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>
        {/* Featured Content Section */}
        <motion.section
          className="py-12 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 dark:text-black">Food For Thought</h2>
              <p className="text-muted-foreground max-w-2xl dark:text-[#111111e5]">
                Explore our latest articles, tips, and stories about food, delivery, and the culinary world
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full mb-8">
              <TabsList className="mx-auto flex justify-center">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="guides">Food Guides</TabsTrigger>
                <TabsTrigger value="healthy">Healthy Eating</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>
            </Tabs>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {blogPosts.map((post) => (
                <motion.div key={post.id} variants={item}>
                  <BlogPostCard
                    title={post.title}
                    excerpt={post.excerpt}
                    image={post.image}
                    date={post.date}
                    readTime={post.readTime}
                    category={post.category}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mt-8">
              <Button variant="outline" className="gap-2">
                View All Articles <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>
        {/* Testimonials Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-10">
              <Quote className="h-10 w-10 text-rose-200 mb-4" />
              <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
              <p className="text-muted-foreground max-w-2xl">
                Don't just take our word for it - hear from some of our satisfied customers!
              </p>
            </div>

            <TestimonialCarousel />
          </div>
        </motion.section>
        {/* How It Works Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl">
                Getting your favorite food delivered is easier than ever with FoodExpress
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="h-10 w-10 text-rose-500" />,
                  title: "Browse Restaurants",
                  description:
                    "Explore restaurants and cuisines near you with our easy-to-use search and filter options.",
                },
                {
                  icon: <ShoppingBag className="h-10 w-10 text-rose-500" />,
                  title: "Place Your Order",
                  description:
                    "Select your favorite dishes, customize as needed, and place your order in just a few taps.",
                },
                {
                  icon: <Utensils className="h-10 w-10 text-rose-500" />,
                  title: "Enjoy Your Meal",
                  description:
                    "Track your order in real-time and enjoy your delicious meal delivered right to your doorstep.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg border"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="bg-rose-50 p-4 rounded-full mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
