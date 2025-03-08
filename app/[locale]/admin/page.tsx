import { getProductStats, getCategoryStats } from '@/actions/analytics/analytics'
import ProductChart from '@/components/admin/productchat'
import CategoryChart from '@/components/admin/categorychart'
import StatCards from '@/components/admin/statcards'
import styles from './layout.module.scss'

export const metadata = {
  title: 'Analytics Dashboard',
  description: 'View product and category statistics',
}

export default async function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analytics Dashboard</h1>
      <DashboardContent />
    </div>
  )
}

async function DashboardContent() {
  // Get all the data from server actions
  const [productStats, categoryStats] = await Promise.all([
    getProductStats(),
    getCategoryStats(),
  ])
  
  return (
    <div className={styles.contentWrapper}>
      <StatCards 
        totalProducts={productStats.totalProducts} 
        availableProducts={productStats.availableProducts} 
        totalCategories={categoryStats.totalCategories} 
      />
      
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Products Over Time</h2>
          <ProductChart data={productStats.productsByDate} />
        </div>
        
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Categories by Product Count</h2>
          <CategoryChart data={categoryStats.topCategories} />
        </div>
      </div>
    </div>
  )
}