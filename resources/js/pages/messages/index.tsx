import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

interface Message {
    id: number
    name: string
    email: string
    subject: string
    message: string
    is_read: boolean
    created_at: string
}

interface Props {
    messages: Message[]
}

export default function MessagesIndex({ messages }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    return (
        <AppLayout>
            <Head title="Messages" />

            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Contact Messages
                                </h1>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {messages.length} total messages
                                </span>
                            </div>

                            {messages.length > 0 ? (
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${
                                                !message.is_read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-gray-900">
                                                            {message.subject}
                                                        </h4>
                                                        {!message.is_read && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-1">
                                                        From: <span className="font-medium">{message.name}</span> ({message.email})
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(message.created_at)}
                                                    </p>
                                                </div>                                                <Link
                                                    href={`/messages/${message.id}`}
                                                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                                >
                                                    View →
                                                </Link>
                                            </div>
                                            
                                            <div className="mt-3">
                                                <p className="text-gray-700 text-sm line-clamp-2">
                                                    {message.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                                    <p className="text-gray-500 mb-4">Messages from the contact form will appear here.</p>                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                                    >
                                        Visit Contact Page
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
