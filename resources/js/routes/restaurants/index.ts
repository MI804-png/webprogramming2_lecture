import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RestaurantController::index
 * @see app/Http/Controllers/RestaurantController.php:15
 * @route '/restaurants'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/restaurants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RestaurantController::index
 * @see app/Http/Controllers/RestaurantController.php:15
 * @route '/restaurants'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RestaurantController::index
 * @see app/Http/Controllers/RestaurantController.php:15
 * @route '/restaurants'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RestaurantController::index
 * @see app/Http/Controllers/RestaurantController.php:15
 * @route '/restaurants'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RestaurantController::show
 * @see app/Http/Controllers/RestaurantController.php:27
 * @route '/restaurants/{restaurant}'
 */
export const show = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/restaurants/{restaurant}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RestaurantController::show
 * @see app/Http/Controllers/RestaurantController.php:27
 * @route '/restaurants/{restaurant}'
 */
show.url = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restaurant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restaurant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restaurant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restaurant: typeof args.restaurant === 'object'
                ? args.restaurant.id
                : args.restaurant,
                }

    return show.definition.url
            .replace('{restaurant}', parsedArgs.restaurant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RestaurantController::show
 * @see app/Http/Controllers/RestaurantController.php:27
 * @route '/restaurants/{restaurant}'
 */
show.get = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RestaurantController::show
 * @see app/Http/Controllers/RestaurantController.php:27
 * @route '/restaurants/{restaurant}'
 */
show.head = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RestaurantController::create
 * @see app/Http/Controllers/RestaurantController.php:40
 * @route '/restaurants/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/restaurants/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RestaurantController::create
 * @see app/Http/Controllers/RestaurantController.php:40
 * @route '/restaurants/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RestaurantController::create
 * @see app/Http/Controllers/RestaurantController.php:40
 * @route '/restaurants/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RestaurantController::create
 * @see app/Http/Controllers/RestaurantController.php:40
 * @route '/restaurants/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RestaurantController::store
 * @see app/Http/Controllers/RestaurantController.php:48
 * @route '/restaurants'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/restaurants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RestaurantController::store
 * @see app/Http/Controllers/RestaurantController.php:48
 * @route '/restaurants'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RestaurantController::store
 * @see app/Http/Controllers/RestaurantController.php:48
 * @route '/restaurants'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RestaurantController::edit
 * @see app/Http/Controllers/RestaurantController.php:69
 * @route '/restaurants/{restaurant}/edit'
 */
export const edit = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/restaurants/{restaurant}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RestaurantController::edit
 * @see app/Http/Controllers/RestaurantController.php:69
 * @route '/restaurants/{restaurant}/edit'
 */
edit.url = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restaurant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restaurant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restaurant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restaurant: typeof args.restaurant === 'object'
                ? args.restaurant.id
                : args.restaurant,
                }

    return edit.definition.url
            .replace('{restaurant}', parsedArgs.restaurant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RestaurantController::edit
 * @see app/Http/Controllers/RestaurantController.php:69
 * @route '/restaurants/{restaurant}/edit'
 */
edit.get = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RestaurantController::edit
 * @see app/Http/Controllers/RestaurantController.php:69
 * @route '/restaurants/{restaurant}/edit'
 */
edit.head = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RestaurantController::update
 * @see app/Http/Controllers/RestaurantController.php:79
 * @route '/restaurants/{restaurant}'
 */
export const update = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/restaurants/{restaurant}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RestaurantController::update
 * @see app/Http/Controllers/RestaurantController.php:79
 * @route '/restaurants/{restaurant}'
 */
update.url = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restaurant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restaurant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restaurant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restaurant: typeof args.restaurant === 'object'
                ? args.restaurant.id
                : args.restaurant,
                }

    return update.definition.url
            .replace('{restaurant}', parsedArgs.restaurant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RestaurantController::update
 * @see app/Http/Controllers/RestaurantController.php:79
 * @route '/restaurants/{restaurant}'
 */
update.put = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RestaurantController::update
 * @see app/Http/Controllers/RestaurantController.php:79
 * @route '/restaurants/{restaurant}'
 */
update.patch = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RestaurantController::destroy
 * @see app/Http/Controllers/RestaurantController.php:101
 * @route '/restaurants/{restaurant}'
 */
export const destroy = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/restaurants/{restaurant}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RestaurantController::destroy
 * @see app/Http/Controllers/RestaurantController.php:101
 * @route '/restaurants/{restaurant}'
 */
destroy.url = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restaurant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restaurant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restaurant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restaurant: typeof args.restaurant === 'object'
                ? args.restaurant.id
                : args.restaurant,
                }

    return destroy.definition.url
            .replace('{restaurant}', parsedArgs.restaurant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RestaurantController::destroy
 * @see app/Http/Controllers/RestaurantController.php:101
 * @route '/restaurants/{restaurant}'
 */
destroy.delete = (args: { restaurant: number | { id: number } } | [restaurant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const restaurants = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default restaurants