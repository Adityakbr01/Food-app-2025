import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileNavbar } from "@/components/Mobile-navBar"

export default function page() {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 bg-background z-10 border-b">
        <div className="container flex items-center h-16 px-4">
          <h1 className="font-semibold">Your Orders</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <Tabs defaultValue="active">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="active" className="flex-1">
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">
              Completed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-rose-50 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Spice Garden</h3>
                      <p className="text-sm text-muted-foreground">Order #FE12345</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                      <Clock className="h-3 w-3" />
                      <span>On the way</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium">2 items</p>
                      <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                    </div>
                    <p className="font-medium">₹598.5</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/orders/1">Track Order</Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-rose-500">
                      Help
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Pizza Paradise</h3>
                      <p className="text-sm text-muted-foreground">Order #FE12340</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      <span>Delivered</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium">3 items</p>
                      <p className="text-sm text-muted-foreground">Yesterday, 8:15 PM</p>
                    </div>
                    <p className="font-medium">₹745</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/restaurant/2">
                        Reorder <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Burger Barn</h3>
                      <p className="text-sm text-muted-foreground">Order #FE12335</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      <span>Delivered</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium">2 items</p>
                      <p className="text-sm text-muted-foreground">Mar 5, 1:20 PM</p>
                    </div>
                    <p className="font-medium">₹450</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/restaurant/3">
                        Reorder <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MobileNavbar />
    </div>
  )
}

