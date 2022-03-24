import styles from './Layout.module.scss';
import PhotosList from '../components/PhotosList';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <p className={styles.header}>Workate - Frontend Task</p>
      <PhotosList />
      <p className={styles.author}>Author: Monika Henschke</p>
    </div>
  );
};

export default Layout;
