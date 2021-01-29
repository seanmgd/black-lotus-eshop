import { stopEvent } from '@ttrmz/react-utils'
import React from 'react'
import { withTranslation } from '../../i18n'
import { checkValidity } from '../../utils/checkFormValidity'
import { renderForm } from '../../utils/renderForm'
import styles from '../../styles/form.module.scss'
import { useUserContext } from '../../contexts/userContext'
import { useSession, signIn, signOut } from 'next-auth/client'
import Link from 'next/link'

function Login({ t }) {
  const [formControls, setFormControls] = React.useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: t('mail_address'),
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: t('password'),
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  })

  const [loginMode, setLoginMode] = React.useState(true)
  const { login, register } = useUserContext()

  React.useEffect(() => {
    if (loginMode === false) {
      setFormControls({
        ...formControls,
        controls: {
          lastName: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: t('lastname'),
            },
            value: '',
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: t('mail_address'),
            },
            value: '',
            validation: {
              required: true,
              isEmail: true,
            },
            valid: false,
            touched: false,
          },
          password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: t('password'),
            },
            value: '',
            validation: {
              required: true,
              minLength: 6,
            },
            valid: false,
            touched: false,
          },
        },
      })
    } else {
      setFormControls({
        controls: {
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: t('mail_address'),
            },
            value: '',
            validation: {
              required: true,
              isEmail: true,
            },
            valid: false,
            touched: false,
          },
          password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: t('password'),
            },
            value: '',
            validation: {
              required: true,
              minLength: 6,
            },
            valid: false,
            touched: false,
          },
        },
        isSignup: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginMode, t])

  const formElements = []
  for (let key in formControls.controls) {
    formElements.push({
      id: key,
      config: formControls.controls[key],
    })
  }

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...formControls.controls,
      [controlName]: {
        ...formControls.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          formControls.controls[controlName].validation,
        ),
        touched: true,
      },
    }
    setFormControls({ controls: updatedControls })
  }

  const loginHandler = (event) => {
    stopEvent(event)

    const loginParams = {
      email: formControls.controls.email.value,
      password: formControls.controls.password.value,
    }
    login(loginParams)
  }

  const registerHandler = (event) => {
    stopEvent(event)

    const registerParams = {
      name: formControls.controls.lastName.value,
      email: formControls.controls.email.value,
      password: formControls.controls.password.value,
    }
    register(registerParams)
  }

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }
  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        {renderForm(formElements, inputChangedHandler)}

        <button onClick={loginMode ? loginHandler : registerHandler}>
          {loginMode ? t('login') : t('register')}
        </button>
      </form>

      <a onClick={handleSignin} className="btn-signin">
        Se connecter avec Google, Facebook ou Github
      </a>
      <p className={styles.clientText}>
        <span>{loginMode ? t('new_user') : t('user')}</span>
      </p>

      <a
        className={styles.switchForm}
        size="large"
        onClick={() => setLoginMode(!loginMode)}
      >
        {loginMode ? t('create_account') : t('login_account')}
      </a>
    </div>
  )
}

export default withTranslation('common')(Login)
