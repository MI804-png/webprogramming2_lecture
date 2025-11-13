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
    message: Message
}

export default function MessageShow({ message }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    return (
        <AppLayout>
            <Head title={`Message: ${message.subject}`} />

            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link
                            href="/messages"
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                            ← Back to Messages
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {message.subject}
                                    </h1>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Read
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <span className="font-medium">From:</span> {message.name}
                                    </div>
                                    <div>
                                        <span className="font-medium">Email:</span> {message.email}
                                    </div>
                                    <div>
                                        <span className="font-medium">Date:</span> {formatDate(message.created_at)}
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                                        {message.message}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <Link
                                    href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Reply via Email
                                </Link>
                                
                                <Link
                                    href="/messages"
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
                                >
                                    View All Messages
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
