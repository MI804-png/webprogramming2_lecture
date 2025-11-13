import { Head, Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'

interface Restaurant {
    id: number
    name: string
    address: string
    phone: string | null
    email: string | null
    description: string | null
    cuisine_type: string
    rating: number
    price_range: string | null
    image_url: string | null
    is_active: boolean
}

interface Props {
    restaurants: Restaurant[]
    auth: {
        user: {
            role: string
        }
    }
}

export default function RestaurantsIndex({ restaurants, auth }: Props) {
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <AppLayout>
            <Head title="Restaurants" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Our Restaurants
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Discover amazing restaurants and cuisines
                        </p>
                    </div>
                    
                    {isAdmin && (
                        <Link href="/restaurants/create">
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add Restaurant
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="max-w-7xl mx-auto">
                    {restaurants.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No restaurants found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                There are no restaurants available at the moment.
                            </p>
                            {isAdmin && (
                                <Link href="/restaurants/create">
                                    <Button>Add First Restaurant</Button>
                                </Link>
                            )}
                        </div>                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {restaurants.map((restaurant) => (
                                <div
                                    key={restaurant.id}
                                    className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                <div className="h-48 bg-gray-200">
                                    {restaurant.image_url ? (
                                        <img
                                            src={restaurant.image_url}
                                            alt={restaurant.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {restaurant.name}
                                        </h3>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{restaurant.rating}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-purple-600 mb-2">
                                        {restaurant.cuisine_type}
                                    </p>
                                    
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {restaurant.description || 'No description available'}
                                    </p>
                                    
                                    <p className="text-gray-500 text-sm mb-4">
                                        {restaurant.address}
                                    </p>
                                    
                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={`/restaurants/${restaurant.id}`}
                                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition duration-300"
                                        >
                                            View Menu
                                        </Link>
                                        
                                        <div className="text-right">
                                            {restaurant.phone && (
                                                <p className="text-xs text-gray-500">{restaurant.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}
