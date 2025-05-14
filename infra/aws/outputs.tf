output "s3_bucket_name" {
  value = aws_s3_bucket.product_images.id
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.main_client.id
}

output "rds_instance_endpoint" {
  value = aws_db_instance.pos_db.endpoint
}
