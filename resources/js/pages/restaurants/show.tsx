import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/AppLayout'

interface Restaurant {
    id: number
    name: string
    address: string
    phone: string | null
    email: string | null
    description: string | null
    cuisine_type: string
    rating: number
    image_url: string | null
    is_active: boolean
}

interface Dish {
    id: number
    name: string
    description: string | null
    price: number
    category: string
    image_url: string | null
    is_available: boolean
    preparation_time: number | null
}

interface Props {
    restaurant: Restaurant
    dishes: Dish[]
}

export default function RestaurantShow({ restaurant, dishes }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    // Group dishes by category
    const dishesByCategory = dishes.reduce((acc, dish) => {
        if (!acc[dish.category]) {
            acc[dish.category] = []
        }
        acc[dish.category].push(dish)
        return acc
    }, {} as Record<string, Dish[]>)

    return (
        <AppLayout>
            <Head title={restaurant.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Restaurant Header */}
                    <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-8">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                {restaurant.image_url ? (
                                    <img
                                        src={restaurant.image_url}
                                        alt={restaurant.name}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-64 md:h-full bg-gray-200 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="md:w-2/3 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            {restaurant.name}
                                        </h1>
                                        <p className="text-lg text-purple-600 mb-2">
                                            {restaurant.cuisine_type}
                                        </p>
                                        <div className="flex items-center mb-4">
                                            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-lg font-semibold text-gray-700">{restaurant.rating}</span>
                                            <span className="text-gray-500 ml-1">rating</span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/restaurants"
                                        className="text-purple-600 hover:text-purple-800 font-medium"
                                    >
                                        ← Back to Restaurants
                                    </Link>
                                </div>
                                
                                {restaurant.description && (
                                    <p className="text-gray-600 mb-4">
                                        {restaurant.description}
                                    </p>
                                )}
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {restaurant.address}
                                    </div>
                                    
                                    {restaurant.phone && (
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {restaurant.phone}
                                        </div>
                                    )}
                                    
                                    {restaurant.email && (
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {restaurant.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
                            
                            {Object.keys(dishesByCategory).length > 0 ? (
                                <div className="space-y-8">
                                    {Object.entries(dishesByCategory).map(([category, categoryDishes]) => (
                                        <div key={category}>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                                {category}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {categoryDishes.map((dish) => (
                                                    <div
                                                        key={dish.id}
                                                        className="flex bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                                                    >
                                                        {dish.image_url && (
                                                            <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                                                                <img
                                                                    src={dish.image_url}
                                                                    alt={dish.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-semibold text-gray-900">
                                                                    {dish.name}
                                                                </h4>
                                                                <span className="font-bold text-purple-600 ml-2">
                                                                    {formatCurrency(dish.price)}
                                                                </span>
                                                            </div>
                                                            
                                                            {dish.description && (
                                                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                                    {dish.description}
                                                                </p>
                                                            )}
                                                            
                                                            <div className="flex justify-between items-center">
                                                                <div className="flex items-center space-x-2">
                                                                    {dish.preparation_time && (
                                                                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                                                            {dish.preparation_time} min
                                                                        </span>
                                                                    )}
                                                                    
                                                                    {dish.is_available ? (
                                                                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                                                            Available
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                                                                            Unavailable
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H19V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H7Z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items available</h3>
                                    <p className="text-gray-500">This restaurant hasn't added their menu yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
