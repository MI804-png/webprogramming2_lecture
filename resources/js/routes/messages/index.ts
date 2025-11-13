import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:11
 * @route '/messages'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:11
 * @route '/messages'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:11
 * @route '/messages'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:11
 * @route '/messages'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:20
 * @route '/messages/{message}'
 */
export const show = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:20
 * @route '/messages/{message}'
 */
show.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return show.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:20
 * @route '/messages/{message}'
 */
show.get = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:20
 * @route '/messages/{message}'
 */
show.head = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const messages = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default messages