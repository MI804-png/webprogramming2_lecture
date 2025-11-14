import { Head, Link, useForm } from '@inertiajs/react'
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
    auth: {
        user: {
            id: number
            name: string
            email: string
            role: string
        } | null
    }
}

export default function MessageEdit({ message, auth }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        is_read: message.is_read
    })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/messages/${message.id}`)
    }

    // Only admin can edit messages
    if (auth.user?.role !== 'admin') {
        return (
            <AppLayout>
                <Head title="Access Denied" />
                <div className="container mx-auto py-8 px-4">
                    <div className="max-w-md mx-auto text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                        <p className="text-gray-600 mb-4">You don't have permission to edit messages.</p>
                        <Link href="/messages" className="text-purple-600 hover:text-purple-800">
                            ← Back to Messages
                        </Link>
                    </div>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <Head title={`Edit Message: ${message.subject}`} />

            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link
                            href={`/messages/${message.id}`}
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                            ← Back to Message
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Edit Message
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Original message received on {formatDate(message.created_at)}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Sender Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={8}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_read"
                                        checked={data.is_read}
                                        onChange={(e) => setData('is_read', e.target.checked)}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_read" className="ml-2 block text-sm text-gray-900 dark:text-white">
                                        Mark as read
                                    </label>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
                                    >
                                        {processing && (
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        Update Message
                                    </button>

                                    <Link
                                        href={`/messages/${message.id}`}
                                        className="inline-flex items-center px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                                    >
                                        Cancel
                                    </Link>

                                    <Link
                                        href="/messages"
                                        className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition duration-300"
                                    >
                                        All Messages
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
