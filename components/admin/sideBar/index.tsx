"use client";
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, Grid3x3, Package, LogOut, Settings } from 'lucide-react';
import styles from "./sidebar.module.scss";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`${styles.adminSidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.sidebarHeader}>
        <h2>{isExpanded ? "Панель Администратора" : ""}</h2>
        <button 
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        <Link href="/admin" className={styles.navLink}>
          <Grid3x3 size={20} />
          {isExpanded && <span>Дашборд</span>}
        </Link>

        <Link href="/admin/categories" className={styles.navLink}>
          <Grid3x3 size={20} />
          {isExpanded && <span>Категории</span>}
        </Link>

        <Link href="/admin/products" className={styles.navLink}>
          <Package size={20} />
          {isExpanded && <span>Продукция</span>}
        </Link>

        {/* <Link href="/admin/settings" className={styles.navLink}>
          <Settings size={20} />
          {isExpanded && <span>Настройки</span>}
        </Link> */}
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={styles.logoutButton}>
          <LogOut size={20} />
          {isExpanded && <span>Выйти</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;