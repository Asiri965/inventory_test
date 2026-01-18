import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\InventoryController::add
 * @see app/Http/Controllers/InventoryController.php:15
 * @route '/inventory/add'
 */
export const add = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/inventory/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InventoryController::add
 * @see app/Http/Controllers/InventoryController.php:15
 * @route '/inventory/add'
 */
add.url = (options?: RouteQueryOptions) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::add
 * @see app/Http/Controllers/InventoryController.php:15
 * @route '/inventory/add'
 */
add.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InventoryController::add
 * @see app/Http/Controllers/InventoryController.php:15
 * @route '/inventory/add'
 */
    const addForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: add.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InventoryController::add
 * @see app/Http/Controllers/InventoryController.php:15
 * @route '/inventory/add'
 */
        addForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: add.url(options),
            method: 'post',
        })
    
    add.form = addForm
/**
* @see \App\Http\Controllers\InventoryController::deduct
 * @see app/Http/Controllers/InventoryController.php:21
 * @route '/inventory/deduct'
 */
export const deduct = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deduct.url(options),
    method: 'post',
})

deduct.definition = {
    methods: ["post"],
    url: '/inventory/deduct',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InventoryController::deduct
 * @see app/Http/Controllers/InventoryController.php:21
 * @route '/inventory/deduct'
 */
deduct.url = (options?: RouteQueryOptions) => {
    return deduct.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InventoryController::deduct
 * @see app/Http/Controllers/InventoryController.php:21
 * @route '/inventory/deduct'
 */
deduct.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deduct.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InventoryController::deduct
 * @see app/Http/Controllers/InventoryController.php:21
 * @route '/inventory/deduct'
 */
    const deductForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deduct.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InventoryController::deduct
 * @see app/Http/Controllers/InventoryController.php:21
 * @route '/inventory/deduct'
 */
        deductForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deduct.url(options),
            method: 'post',
        })
    
    deduct.form = deductForm
const inventory = {
    add: Object.assign(add, add),
deduct: Object.assign(deduct, deduct),
}

export default inventory