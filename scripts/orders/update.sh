#!/bin/bash

API="http://localhost:4741"
URL_PATH="/orders"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "order": {
      "products": {
        "name": "'"${NAME}"'",
        "price": "'"${PRICE}"'",
        "category": "'"${CATEGORY}"'",
        "description": "'"${DESCRIPTION}"'"
      },
      "purchaseStatus": "'"${PURCHASED}"'",
      "stripeToken": "'"${STRIPE}"'"
    }
  }'

echo
