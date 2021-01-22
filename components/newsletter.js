import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { useTranslation } from 'react-i18next'
import styles from '../styles/newsletter.module.scss'

const CustomForm = ({ status, onValidated }) => {
  const { t } = useTranslation()
  let email
  const submit = () =>
    email &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
    })

  return (
    <>
      <div className={styles.form}>
        <input
          ref={(node) => (email = node)}
          type="email"
          placeholder={t('mail_address')}
        />
        <br />
        <button onClick={submit}>{t('submit')}</button>
      </div>
      {status === 'sending' && (
        <span className={styles.status}>{t('newsletter_loading')}</span>
      )}
      {status === 'error' && (
        <span className={styles.status}>{t('newsletter_error')}</span>
      )}
      {status === 'success' && (
        <span className={styles.status}>{t('newsletter_success')}</span>
      )}
    </>
  )
}

export const Newsletter = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.newsContainer}>
      <p className={styles.text}>{t('newsletter_subscribe')}</p>
      <MailchimpSubscribe
        url={
          'https://vercelapp.us7.list-manage.com/subscribe/post?u=0a2124b6cee5eccf85e512655&amp;id=8967120b20'
        }
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  )
}
