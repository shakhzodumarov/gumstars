import styles from './statcards.module.scss'

interface StatCardsProps {
  totalProducts: number
  availableProducts: number
  totalCategories: number
}

export default function StatCards({ totalProducts, availableProducts, totalCategories }: StatCardsProps) {
  return (
    <div className={styles.cardsGrid}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div>
            <p className={styles.cardLabel}>Total Products</p>
            <h3 className={styles.cardValue}>{totalProducts}</h3>
          </div>
          <div className={styles.iconWrapper}>
            {/* Icon SVG or component */}
          </div>
        </div>
        <p className={styles.cardMeta}>
          <span className={styles.highlight}>{availableProducts}</span> currently available
        </p>
      </div>
      
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div>
            <p className={styles.cardLabel}>Total Categories</p>
            <h3 className={styles.cardValue}>{totalCategories}</h3>
          </div>
          <div className={styles.iconWrapper}>
            {/* Icon SVG or component */}
          </div>
        </div>
        <p className={styles.cardMeta}>
          Used to organize product catalog
        </p>
      </div>
      
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div>
            <p className={styles.cardLabel}>Product Availability</p>
            <h3 className={styles.cardValue}>{Math.round((availableProducts / totalProducts) * 100)}%</h3>
          </div>
          <div className={styles.iconWrapper}>
            {/* Icon SVG or component */}
          </div>
        </div>
        <p className={styles.cardMeta}>
          <span className={styles.highlight}>{totalProducts - availableProducts}</span> unavailable products
        </p>
      </div>
    </div>
  )
}