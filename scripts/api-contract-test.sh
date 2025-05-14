#!/bin/bash
# Placeholder for API contract test (use Dredd or similar)
# Assuming OpenAPI spec is located at openapi.yml

if [ ! -f openapi.yml ]; then
  echo "❌ Missing openapi.yml spec"
  exit 1
fi

echo "✅ API contract placeholder passed"