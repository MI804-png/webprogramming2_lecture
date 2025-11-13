import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

export default function CreateRestaurant() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        cuisine_type: '',
        rating: '',
        price_range: '',
        opening_hours: '',
        website: '',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/restaurants', {
            onSuccess: () => {
                reset();
            },
        });
    };

    const cuisineTypes = [
        'Italian',
        'Chinese',
        'Japanese',
        'Indian',
        'Mexican',
        'French',
        'Thai',
        'Mediterranean',
        'American',
        'Fast Food',
        'Vegetarian',
        'Seafood',
        'BBQ',
        'Other'
    ];

    const priceRanges = [
        { value: '$', label: '$ - Budget' },
        { value: '$$', label: '$$ - Moderate' },
        { value: '$$$', label: '$$$ - Expensive' },
        { value: '$$$$', label: '$$$$ - Very Expensive' },
    ];

    return (
        <AppLayout>
            <Head title="Add New Restaurant" />
            
            <div className="max-w-2xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Add New Restaurant
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Create a new restaurant listing with all the details.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Restaurant Name *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter restaurant name"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cuisine_type">Cuisine Type *</Label>
                            <Select value={data.cuisine_type} onValueChange={(value) => setData('cuisine_type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select cuisine type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cuisineTypes.map((cuisine) => (
                                        <SelectItem key={cuisine} value={cuisine}>
                                            {cuisine}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.cuisine_type} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                            placeholder="Describe the restaurant..."
                            rows={3}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input
                            id="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Enter full address"
                            required
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Enter phone number"
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter email address"
                            />
                            <InputError message={errors.email} />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating (1-5)</Label>
                            <Input
                                id="rating"
                                type="number"
                                min="1"
                                max="5"
                                step="0.1"
                                value={data.rating}
                                onChange={(e) => setData('rating', e.target.value)}
                                placeholder="4.5"
                            />
                            <InputError message={errors.rating} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price_range">Price Range</Label>
                            <Select value={data.price_range} onValueChange={(value) => setData('price_range', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select price range" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priceRanges.map((range) => (
                                        <SelectItem key={range.value} value={range.value}>
                                            {range.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.price_range} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                type="url"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                placeholder="https://restaurant.com"
                            />
                            <InputError message={errors.website} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="opening_hours">Opening Hours</Label>
                        <Input
                            id="opening_hours"
                            type="text"
                            value={data.opening_hours}
                            onChange={(e) => setData('opening_hours', e.target.value)}
                            placeholder="Mon-Sun: 9:00 AM - 10:00 PM"
                        />
                        <InputError message={errors.opening_hours} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <Label htmlFor="is_active">Restaurant is active and accepting orders</Label>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Create Restaurant
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
