import { SocialMedias } from './socialMedias'
import Link from 'next/link'
import { withTranslation } from '../i18n'
import styles from '../styles/footer.module.scss'

const Footer = ({ t }) => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>{t('services_clients')}</h3>
          <ul className={styles.columnList}>
            <li>
              <Link href={'/contact'}>{t('contact_us')}</Link>
            </li>
            <li>
              <Link href={'/'}>{t('help')}</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>{t('discovers')}</h3>
          <ul className={styles.columnList}>
            <li>
              <SocialMedias />
            </li>
            <li>
              <Link href={'/'}>{t('who_are_we')}</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>{t('legal_notices')}</h3>
          <ul className={styles.columnList}>
            <li>
              <Link href={'/'}>{t('cookies')}</Link>
            </li>
            <li>
              <Link href={'/'}>{t('terms_of_use')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
export default withTranslation('common')(Footer)
