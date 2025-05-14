provider "aws" {
  region = "us-west-2"
}

resource "aws_db_instance" "postgres" {
  identifier              = "pos-rds-instance"
  allocated_storage       = 20
  engine                  = "postgres"
  engine_version          = "15.3"
  instance_class          = "db.t3.micro"
  name                    = "posdb"
  username                = "postgres"
  password                = "changeme123"
  skip_final_snapshot     = true
  publicly_accessible     = true
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}