"use client";
import Button from "@/components/UI/button";
import { signIn } from "next-auth/react";
import { useRouter } from "../../../../../i18n/routing";
import { useState } from "react";
import styles from "./login.module.scss";
import { useLocale } from "next-intl";

const Login = () => {
  const router = useRouter();
  const locale = useLocale();
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    signIn("credentials", {
      ...loginData,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        const targetPath = `/admin`;
        router.push(targetPath);
      }

      if (callback?.error) {
        setError(callback.error);
      }
    });
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["form-side"]}>
        <div className={styles["particles"]}>
          <div className={styles["particle"]}></div>
          <div className={styles["particle"]}></div>
          <div className={styles["particle"]}></div>
          <div className={styles["particle"]}></div>
          <div className={styles["particle"]}></div>
        </div>
        <div className={styles["form-content"]}>
          <h1>Admin Gumstar</h1>
          <input
            type="text"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.currentTarget.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.currentTarget.value })
            }
          />
          <Button text="Login" onClick={handleLogin} />
          {error && <span className={styles["error-message"]}>{error}</span>}
        </div>
      </div>
      <div className={styles["image-side"]}></div>
    </div>
  );
};

export default Login;