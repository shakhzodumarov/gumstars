"use client";

import { useState, useEffect } from "react";
import StoreNavBar from "@/components/store/navbar";
import StoreFooter from "../../../components/store/footer/index";
import { Provider } from "react-redux";
import { shoppingCartStore } from "@/store/shoppingCart";
import styles from "./layout.module.scss"; // Add your own style file for loading

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Keep the loading state for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {isLoading ? (
        <div className={styles.loadingScreen}>
          <div className={styles.radiatingWaves}></div>
          <div className={styles.logoContainer}>
            <img src="/images/images/Gumstars.png" alt="Logo" className={styles.spinningLogo} />
          </div>
        </div>
      ) : (
        <Provider store={shoppingCartStore}>
          <StoreNavBar />
          {children}
          <StoreFooter />
        </Provider>
      )}
    </main>
  );
};

export default StoreLayout;
