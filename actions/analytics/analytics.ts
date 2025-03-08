// app/actions/analytics.ts
'use server'

import { db } from "@/lib/db";

// Get product statistics with date filters
export const getProductStats = async (startDate?: Date, endDate?: Date) => {
  // Default to last 30 days if no date range is provided
  const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const end = endDate || new Date()

  // Get count of products created per day
  const productsByDate = await db.product.groupBy({
    by: ['createdAt'],
    _count: {
      id: true
    },
    where: {
      createdAt: {
        gte: start,
        lte: end
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  // Get total product count
  const totalProducts = await db.product.count()

  // Get available vs unavailable products
  const availableProducts = await db.product.count({
    where: { isAvailable: true }
  })

  return {
    productsByDate: productsByDate.map(item => ({
      date: item.createdAt.toISOString().split('T')[0],
      count: item._count.id
    })),
    totalProducts,
    availableProducts,
    unavailableProducts: totalProducts - availableProducts
  }
}

// Get category statistics
export const getCategoryStats = async () => {
  const categories = await db.category.findMany({
    include: {
      products: true
    }
  })

  // Get categories with product counts
  const categoriesWithCounts = categories.map(category => ({
    id: category.id,
    name: category.name,
    productCount: category.products.length
  }))

  // Get top categories by product count
  const topCategories = [...categoriesWithCounts]
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, 5)

  // Get total category count
  const totalCategories = categories.length

  // Get parent categories vs child categories
  const parentCategories = categories.filter(c => !c.parentID).length
  const childCategories = categories.filter(c => c.parentID).length

  return {
    categoriesWithCounts,
    topCategories,
    totalCategories,
    parentCategories,
    childCategories
  }
}

// Get most viewed products
export const getMostViewedProducts = async (limit = 5) => {
  const productViews = await db.pageVisit.groupBy({
    by: ['productID'],
    _count: {
      id: true
    },
    where: {
      pageType: 'PRODUCT',
      productID: {
        not: null
      }
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: limit
  })

  return productViews.map(view => ({
    productID: view.productID,
    viewCount: view._count.id
  }))
}
