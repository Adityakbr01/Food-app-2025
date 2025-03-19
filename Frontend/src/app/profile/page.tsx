"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { ArrowLeft, Camera, Edit2, LogOut, MapPin, Phone, Save, User, X, Mail, Plus, Loader2, Loader } from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"
import { MobileNavbar } from "@/components/Mobile-navBar"
import { useSelector } from "react-redux"
import { RootState } from "@/Redux/store"
import { useUpdateUserProfileMutation } from "@/Redux/Slice/UserApiSlice"
import { toast } from "sonner"


const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

// Form validation schema
const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must not be longer than 30 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must not be longer than 15 digits" })
    .optional(),
  address: addressSchema.optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>



interface User {
  bio?: string;
  _id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  deliveryAddresses?: any[];
  isActive?: boolean;
  profileImage: {
    url: string;
  }
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
}


export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth) as { user: User | null };
  const [errors, seterrors] = useState<string | null>(null)
  const [updateUserProfile, { isLoading, isSuccess, error }] = useUpdateUserProfileMutation()

  const {
    bio,
    _id,
    name,
    email,
    phoneNumber,
    role,
    deliveryAddresses,
    isActive,
    profileImage,
    address

  } = user || {};


  // Mock user data
  const defaultValues: ProfileFormValues = {
    username: name || "Rahul Sharma",
    email: email || "rahul.sharma@example.com",
    bio: bio,
    phone: phoneNumber,
    address: {
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      zipCode: address?.zipCode || "",
    },

  }


  // const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileImages, setProfileImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  )
  const [imagePreview, setImagePreview] = useState<string | null>(profileImage?.url!)

  // Initialize form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const maxSize = 2 * 1024 * 1024; // 2MB limit
    if (file && file.size > maxSize) {
      toast.error("File size is too large! Max allowed size is 2MB.");
      return;
    }
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
  
    // Append text fields to FormData
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("bio", data.bio || "");
    formData.append("phone", data.phone || "");
  
    // Append address fields to FormData
    if (data.address) {
      formData.append("address", JSON.stringify(data.address));
    }
  
    // Append profile image if selected
    const fileInput = document.querySelector<HTMLInputElement>("#profileImageInput");
     console.log(fileInput)
    if (fileInput?.files?.[0]) {
      formData.append("profileImage", fileInput.files[0]); 
    }
  
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    // Send FormData to API
    const updated_user = await updateUserProfile(formData);
    
    if (updated_user.error) {
      updated_user.error.data?.errors.forEach((err: any) => {
        toast.error(err.msg);
      });
      return;
    }
  
    // Update UI after successful update
    toast.success(updated_user.data.message || "Profile updated successfully!");
    setProfileImage(imagePreview);
    setIsEditing(false);
  };
  
  // Cancel editing
  const handleCancel = () => {
    form.reset()
    setImagePreview(profileImage?.url!)
    setIsEditing(false)
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
          <h1 className="font-semibold">Your Profile</h1>
          {!isEditing && (
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Make changes to your profile information here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                        
                          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-background shadow-md">
                            <Image
                              src={imagePreview || "/placeholder.svg"}
                              alt="Profile"
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <label
                            htmlFor="profileImageInput"
                            className="absolute bottom-0 right-0 bg-rose-500 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-rose-600 transition-colors"
                          >
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Change profile picture</span>
                          </label>
                          <input
                            id="profileImageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                        <FormDescription className="mt-2 text-center">
                          Click the camera icon to upload a new profile picture
                        </FormDescription>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />


                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address.street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street</FormLabel>
                              <FormControl>
                                <Input placeholder="Street Address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address.zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input placeholder="Zip Code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              You can <span>@mention</span> other users and organizations.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="cursor-pointer" variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button className="cursor-pointer" onClick={form.handleSubmit(onSubmit)}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" /></> : "Save changes"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={profileImage?.url || "/placeholder.svg"}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
                <h2 className="text-2xl font-bold mt-4">{name}</h2>
                <p className="text-muted-foreground text-center max-w-md mt-2">{bio}</p>
              </div>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Your personal information and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p className="text-sm text-muted-foreground">{name}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{email}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{phoneNumber}</p>
                        </div>
                      </div>
                      <Separator />
                      {address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Address</p>
                            <p className="text-sm text-muted-foreground">{address.city}</p>

                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View your past orders and their status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Your order history will appear here</p>
                        <Button className="mt-4" asChild>
                          <Link href="/orders">View All Orders</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="addresses">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>Manage your delivery addresses</CardDescription>
                    </CardHeader>
                    {address ? (
                      <CardContent className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">Home</p>
                              <p className="text-sm text-muted-foreground">{address?.city}</p>
                              <p className="text-sm text-muted-foreground">{address?.street}</p>
                              <p className="text-sm text-muted-foreground">{address?.state}</p>
                              <p className="text-sm text-muted-foreground">{address?.zipCode}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">Default</Badge>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Home</Badge>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Address
                        </Button>
                      </CardContent>
                    ) : <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">You have no saved addresses</p>
                        <Button className="mt-4 cursor-pointer" onClick={() => setIsEditing(true)}>
                          Add New Address
                        </Button>
                      </div>
                    </CardContent>}
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-8">
                <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <MobileNavbar />
    </div>
  )
}

