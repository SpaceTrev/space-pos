provider "aws" {
  region = "us-west-2"
}

resource "aws_cognito_user_pool" "webstore" {
  name = "webstore_users"
  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "webstore_client" {
  name         = "webstore_app_client"
  user_pool_id = aws_cognito_user_pool.webstore.id
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
  generate_secret = false
}

output "user_pool_id" {
  value = aws_cognito_user_pool.webstore.id
}

output "client_id" {
  value = aws_cognito_user_pool_client.webstore_client.id
}