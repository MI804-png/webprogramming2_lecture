import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/AppLayout'
import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface CuisineData {
    cuisine_type: string
    count: number
}

interface OrdersByMonth {
    month: number
    count: number
}

interface Props {
    cuisineData: CuisineData[]
    ordersByMonth: OrdersByMonth[]
}

export default function GraphsIndex({ cuisineData, ordersByMonth }: Props) {
    const cuisineChartRef = useRef<HTMLCanvasElement>(null)
    const ordersChartRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        let cuisineChart: Chart | null = null
        let ordersChart: Chart | null = null

        // Cuisine Distribution Chart
        if (cuisineChartRef.current) {
            const ctx = cuisineChartRef.current.getContext('2d')
            if (ctx) {
                cuisineChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: cuisineData.map(item => item.cuisine_type),
                        datasets: [{
                            data: cuisineData.map(item => item.count),
                            backgroundColor: [
                                '#8B5CF6', // Purple
                                '#3B82F6', // Blue
                                '#10B981', // Green
                                '#F59E0B', // Yellow
                                '#EF4444', // Red
                                '#6366F1', // Indigo
                                '#8B5A2B', // Brown
                            ],
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Restaurants by Cuisine Type',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            },
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 20
                                }
                            }
                        }
                    }
                })
            }
        }

        // Orders by Month Chart
        if (ordersChartRef.current) {
            const ctx = ordersChartRef.current.getContext('2d')
            if (ctx) {
                const monthNames = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ]

                // Create array for all 12 months, filling missing months with 0
                const chartData = Array.from({ length: 12 }, (_, i) => {
                    const monthData = ordersByMonth.find(item => item.month === i + 1)
                    return monthData ? monthData.count : 0
                })

                ordersChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: monthNames,
                        datasets: [{
                            label: 'Orders',
                            data: chartData,
                            backgroundColor: 'rgba(139, 92, 246, 0.8)',
                            borderColor: 'rgba(139, 92, 246, 1)',
                            borderWidth: 1,
                            borderRadius: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: `Orders by Month (${new Date().getFullYear()})`,
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            },
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        }
                    }
                })
            }
        }

        // Cleanup function
        return () => {
            if (cuisineChart) {
                cuisineChart.destroy()
            }
            if (ordersChart) {
                ordersChart.destroy()
            }
        }
    }, [cuisineData, ordersByMonth])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Statistics & Analytics
                </h2>
            }
        >
            <Head title="Statistics" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Cuisine Distribution Chart */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                            <div className="p-6">
                                <div className="h-96 flex items-center justify-center">
                                    {cuisineData.length > 0 ? (
                                        <canvas ref={cuisineChartRef} />
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            <p>No restaurant data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Orders by Month Chart */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                            <div className="p-6">
                                <div className="h-96 flex items-center justify-center">
                                    <canvas ref={ordersChartRef} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-purple-100 mr-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {cuisineData.reduce((sum, item) => sum + item.count, 0)}
                                    </p>
                                    <p className="text-gray-600">Total Restaurants</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-lg rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 mr-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {ordersByMonth.reduce((sum, item) => sum + item.count, 0)}
                                    </p>
                                    <p className="text-gray-600">Total Orders This Year</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-lg rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100 mr-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H19V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H7Z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {cuisineData.length}
                                    </p>
                                    <p className="text-gray-600">Cuisine Types</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
