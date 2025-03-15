"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuSection } from "./menu-section"
import { MobileNavbar } from "@/components/Mobile-navBar"
import { ecommerceProducts } from "@/utils/Constant"
import { use, useEffect, useState } from "react"
import React from "react"



type tParams = Promise<{ slug: string[] }>;
export default  function RestaurantPage({params}: {params: Promise<{ id: string }>}) {
    const { id } = use(params);
    const [item, setItem] = useState<any>(null);
  
    // Fetch product based on ID when component mounts or when ID changes
    useEffect(() => {
        const selectedItem = ecommerceProducts.find(product => product.id.toString() === id);
        if (selectedItem) {
            setItem(selectedItem);
        } else {
            // Optionally handle the case where the item is not found
            console.error("Product not found");
        }
    }, [id]);

    if (!item) {
        return <div>Product not found</div>;
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

    return (
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
            <header className="sticky top-0 bg-background z-10 border-b">
                <div className="container flex items-center h-16 px-4">
                    <Button variant="ghost" size="icon" asChild className="mr-2">
                        <Link href="/">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="font-semibold">{item?.name}</h1>
                </div>
            </header>

            <main className="flex-1">
                <motion.div
                    className="relative h-48 md:h-64 w-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={item?.image}
                        alt={item?.name}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <div className="container px-4 py-6">
                    <motion.div
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div>
                            <h1 className="text-2xl font-bold mb-1">{item?.name}</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <p>{item?.location}</p>
                                <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground"></div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>1.2 km away</span>
                                </div>
                                <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground"></div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    <span>{item?.rating} (500+ ratings)</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <motion.div
                                className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Clock className="h-3 w-3" />
                                <span>{item?.deliveryTime}</span>
                            </motion.div>
                            <motion.div className="px-2 py-1 bg-blue-50 text-blue-700 rounded" whileHover={{ scale: 1.05 }}>
                                ₹{item?.deliveryFee} delivery
                            </motion.div>
                        </div>
                    </motion.div>

                    <Tabs defaultValue="menu">
                        <TabsList className="mb-6">
                            <TabsTrigger value="menu">Menu</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="info">Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="menu">
                            <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
                                <MenuSection
                                    title="Recommended"
                                    items={[
                                        {
                                            id: "1",
                                            name: "Butter Chicken",
                                            description: "Tender chicken cooked in a rich tomato and butter gravy",
                                            price: "₹280",
                                            image:
                                                "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
                                            isVeg: false,
                                            isBestseller: true,
                                        },
                                        {
                                            id: "2",
                                            name: "Paneer Tikka Masala",
                                            description: "Grilled cottage cheese cubes in a spiced tomato gravy",
                                            price: "₹240",
                                            image:
                                                "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyJTIwdGlra2F8ZW58MHx8MHx8fDA%3D",
                                            isVeg: true,
                                            isBestseller: true,
                                        },
                                    ]}
                                />
                                <MenuSection
                                    title="Starters"
                                    items={[
                                        {
                                            id: "3",
                                            name: "Veg Spring Rolls",
                                            description: "Crispy rolls filled with mixed vegetables",
                                            price: "₹180",
                                            image:
                                                "https://images.unsplash.com/photo-1626200419199-391ae4be7a9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3ByaW5nJTIwcm9sbHN8ZW58MHx8MHx8fDA%3D",
                                            isVeg: true,
                                            isBestseller: false,
                                        },
                                        {
                                            id: "4",
                                            name: "Chicken Tikka",
                                            description: "Marinated chicken pieces grilled in a tandoor",
                                            price: "₹220",
                                            image:
                                                "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHRpa2thfGVufDB8fDB8fHww",
                                            isVeg: false,
                                            isBestseller: false,
                                        },
                                    ]}
                                />
                                <MenuSection
                                    title="Main Course"
                                    items={[
                                        {
                                            id: "5",
                                            name: "Dal Makhani",
                                            description: "Black lentils cooked with butter and cream",
                                            price: "₹200",
                                            image:
                                                "https://images.unsplash.com/photo-1626132647523-66d3a8c7f4e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFsJTIwbWFraGFuaXxlbnwwfHwwfHx8MA%3D%3D",
                                            isVeg: true,
                                            isBestseller: false,
                                        },
                                        {
                                            id: "6",
                                            name: "Chicken Biryani",
                                            description: "Fragrant rice cooked with chicken and aromatic spices",
                                            price: "₹300",
                                            image:
                                                "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
                                            isVeg: false,
                                            isBestseller: true,
                                        },
                                    ]}
                                />
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="reviews">
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Reviews coming soon</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="info">
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Restaurant information coming soon</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <motion.div
                className="fixed bottom-16 md:bottom-0 left-0 right-0 p-4 bg-background border-t"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
            >
                <Button className="w-full">View Cart • ₹0</Button>
            </motion.div>

            <MobileNavbar />
          
        </div>
    )
}


