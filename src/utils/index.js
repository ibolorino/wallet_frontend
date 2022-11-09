import { NotificationManager } from 'react-notifications';

export const notifyError = (errors) => {
  if (errors?.response?.data) {
    for (var [key, value] of Object.entries(errors.response.data)) {
      NotificationManager.error(value.join(". "), key, 4000)
    }
  } else {
    NotificationManager.error("Network error. Please try again later", "Error", 4000)
  }
}


export const fakeError = () => {
  return {
    response: {
      data: {
        errors: {
          json: {
            "Password": "Invalid"
          }
        }
      }
    }
  }
}

export const fakeUser = {
  "username": "rabizao",
  "name": "Rafael Bizao",
  "gravatar": "https://s.gravatar.com/avatar/372cf87924f2812d2bff31ce6ba93758",
  "access_token": "teste"
}

export const fakeStocks = [
  {
    "id": "ABEV3",
    "name": "Ambev",
    "type": "Ação",
    "amount": 10,
    "invested_value": 3560.56,
    "gross_value": 850.33,
    "net_value": 750.33,
    "last_price": 35.33
  },
  {
    "id": "INTL3",
    "name": "Intelbras",
    "type": "Ação",
    "amount": 50,
    "invested_value": 4560.33,
    "gross_value": 8150.33,
    "net_value": 7250.33,
    "last_price": 3555.33
  },
  {
    "id": "COGN3",
    "name": "Cogna",
    "type": "Ação",
    "amount": 10,
    "invested_value": 10560.33,
    "gross_value": 1330.33,
    "net_value": 50.33,
    "last_price": 1.33
  },
]