import styles from '../styles/socialmedias.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faSoundcloud,
  faVimeoV,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'

export const SocialMedias = () => {
  return (
    <div className={styles.wrapper}>
      <a
        rel={'noreferrer'}
        target={'_blank'}
        href={'https://www.facebook.com/'}
      >
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a rel={'noreferrer'} target={'_blank'} href={'https://soundcloud.com/'}>
        <FontAwesomeIcon icon={faSoundcloud} />
      </a>
      <a rel={'noreferrer'} target={'_blank'} href={'https://vimeo.com/'}>
        <FontAwesomeIcon icon={faVimeoV} />
      </a>
      <a rel={'noreferrer'} target={'_blank'} href={'https://www.youtube.com/'}>
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a
        rel={'noreferrer'}
        target={'_blank'}
        href={'https://www.instagram.com/'}
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  )
}
