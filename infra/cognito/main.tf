provider "aws" {
  region = "us-west-2"
}

resource "aws_cognito_user_pool" "users" {
  name = "pos-users"
  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "client" {
  name         = "pos-client"
  user_pool_id = aws_cognito_user_pool.users.id
  generate_secret = false
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
}

output "user_pool_id" {
  value = aws_cognito_user_pool.users.id
}

output "client_id" {
  value = aws_cognito_user_pool_client.client.id
}