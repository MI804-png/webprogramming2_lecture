import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    message: Message;
}

export default function Show({ message }: Props) {
    return (
        <AppLayout>
            <Head title={`Message: ${message.subject}`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                    Message Details
                                </h1>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            From
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {message.name}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {message.email}
                                        </p>
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Subject
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {message.subject}
                                        </p>
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Sent
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(message.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-900 whitespace-pre-wrap">
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mt-6 flex justify-between">
                                    <a
                                        href="/messages"
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Back to Messages
                                    </a>
                                    
                                    <a
                                        href={`/messages/${message.id}/edit`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit Message
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}