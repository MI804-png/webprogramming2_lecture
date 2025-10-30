import { Link, usePage } from '@inertiajs/react'
import { PropsWithChildren, ReactNode } from 'react'

export default function AppLayout({ 
    children, 
    header 
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage<{
        auth: {
            user: {
                id: number
                name: string
                email: string
                role: string
            } | null
        }
    }>().props

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <h1 className="text-xl font-bold text-indigo-600">
                                        Restaurant Hub
                                    </h1>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link 
                                    href="/" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Home
                                </Link>
                                
                                <Link 
                                    href="/restaurants" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Restaurants
                                </Link>

                                <Link 
                                    href="/contact" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Contact
                                </Link>

                                {auth.user && (
                                    <Link 
                                        href="/messages" 
                                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                    >
                                        Messages
                                    </Link>
                                )}

                                {auth.user?.role === 'admin' && (
                                    <Link 
                                        href="/admin" 
                                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                    >
                                        Admin
                                    </Link>
                                )}

                                <Link 
                                    href="/graphs" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Statistics
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-700">
                                        Hello, {auth.user.name}
                                    </span>                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button" 
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link 
                                        href="/login" 
                                        className="text-sm text-gray-700 underline"
                                    >
                                        Log in
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        className="ml-4 text-sm text-gray-700 underline"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Restaurant Hub</h3>
                            <p className="text-gray-300">
                                Discover and order from the best restaurants in your area.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                                <li><Link href="/restaurants" className="text-gray-300 hover:text-white">Restaurants</Link></li>
                                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                            <p className="text-gray-300">Email: info@restauranthub.com</p>
                            <p className="text-gray-300">Phone: +1-555-FOOD</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-300">&copy; 2025 Restaurant Hub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
