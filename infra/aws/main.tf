resource "aws_s3_bucket" "product_images" {
  bucket = var.bucket_name

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }

  tags = {
    Environment = "pos-platform"
  }
}

resource "aws_cognito_user_pool" "main" {
  name = var.user_pool_name

  schema {
    name = var.tenant_attribute_name
    attribute_data_type = "String"
    developer_only_attribute = false
    mutable = true
    required = true
  }

  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "main_client" {
  name         = "${var.user_pool_name}-client"
  user_pool_id = aws_cognito_user_pool.main.id
  generate_secret = false
  explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
}