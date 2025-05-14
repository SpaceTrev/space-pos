provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "uploads" {
  bucket = "pos-platform-uploads"
  acl    = "private"

  tags = {
    Name        = "Uploads Bucket"
    Environment = "dev"
  }
}

output "s3_bucket_name" {
  value = aws_s3_bucket.uploads.id
}