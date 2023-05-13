import styles from "./index.module.css";
import { useRouter } from "next/router";
import { MENU_LISTS } from "./constants";

const Layout = ({children}) => {
  const router = useRouter();
  return (
    <>
      <main className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.sidebar__nav}>
            <ul>
              {MENU_LISTS.map((item, idx) => (
                <li
                  key={idx}
                  className={router.pathname === item.path ? styles.active : ""}
                  onClick={() => {
                    router.push(item.path);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <section className={styles.content}>{children}</section>
      </main>
    </>
  );
};

export default Layout;
