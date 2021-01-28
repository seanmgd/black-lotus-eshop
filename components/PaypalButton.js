import React from 'react'

export function PaypalButton({ total }) {
  const refPaypalBtn = React.useRef()

  React.useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'EUR',
                  value: total,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          console.log(order)
        },
        onError: (err) => {
          console.log(err)
        },
      })
      .render(refPaypalBtn.current)
  }, [])

  return <div ref={refPaypalBtn} />
}

export default PaypalButton
