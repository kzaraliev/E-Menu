import { supabase } from './supabase'

/**
 * Update the sort_order of a category
 */
export async function updateCategorySortOrder(categoryId, newSortOrder) {
  const { data, error } = await supabase
    .from('categories')
    .update({ sort_order: newSortOrder })
    .eq('id', categoryId)
    .select()

  if (error) {
    throw new Error(`Failed to update category sort order: ${error.message}`)
  }

  return data[0]
}

/**
 * Update the sort_order of a menu item
 */
export async function updateMenuItemSortOrder(itemId, newSortOrder) {
  const { data, error } = await supabase
    .from('menu_items')
    .update({ sort_order: newSortOrder })
    .eq('id', itemId)
    .select()

  if (error) {
    throw new Error(`Failed to update menu item sort order: ${error.message}`)
  }

  return data[0]
}

/**
 * Get the next available sort_order for a new category in a restaurant
 */
export async function getNextCategorySortOrder(restaurantId) {
  const { data, error } = await supabase
    .from('categories')
    .select('sort_order')
    .eq('restaurant_id', restaurantId)
    .order('sort_order', { ascending: false })
    .limit(1)

  if (error) {
    throw new Error(`Failed to get next category sort order: ${error.message}`)
  }

  return data.length > 0 ? data[0].sort_order + 1 : 0
}

/**
 * Get the next available sort_order for a new menu item in a category
 */
export async function getNextMenuItemSortOrder(categoryId) {
  const { data, error } = await supabase
    .from('menu_items')
    .select('sort_order')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: false })
    .limit(1)

  if (error) {
    throw new Error(`Failed to get next menu item sort order: ${error.message}`)
  }

  return data.length > 0 ? data[0].sort_order + 1 : 0
} 