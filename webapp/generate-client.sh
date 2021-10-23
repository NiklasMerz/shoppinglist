#!/bin/bash

npx @openapitools/openapi-generator-cli generate -i http://localhost:8000/api/openapi  -o src/app/backend -g typescript-angular
