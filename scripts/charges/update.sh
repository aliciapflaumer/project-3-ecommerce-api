#!/bin/bash

API="http://localhost:4741"
URL_PATH="/charges"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "charge": {
      "text": "'"${TEXT}"'"
    }
  }'

echo
