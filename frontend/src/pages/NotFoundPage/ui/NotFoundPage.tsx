import { FC } from "react";
import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export const NotFoundPage: FC = () => {
  return (
    <main className={`${styles.main}`}>
      <div className={styles.textCenter}>
        <p className={styles.errorCode}>404</p>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.message}>
          Извините, мы не смогли найти страницу, которую вы ищете.
        </p>
        <div className={styles.buttonContainer}>
          <Link to="" className={styles.goBackButton}>
            Вернуться на главную
          </Link>
          <Link to="/support" className={styles.contactSupport}>
            Сообщить о проблеме <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};
