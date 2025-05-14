resource "aws_db_subnet_group" "pos_subnets" {
  name       = "pos-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "POS DB Subnet Group"
  }
}

resource "aws_db_instance" "pos_db" {
  identifier         = "pos-platform-db"
  allocated_storage  = 20
  engine             = "postgres"
  engine_version     = "14.11"
  instance_class     = "db.t3.micro"
  name               = "pos_platform"
  username           = "postgres"
  password           = "postgres1234"
  skip_final_snapshot = true
  publicly_accessible = true

  db_subnet_group_name = aws_db_subnet_group.pos_subnets.name
  vpc_security_group_ids = [aws_security_group.pos_db_sg.id]

  tags = {
    Name = "Space POS DB"
  }
}

resource "aws_security_group" "pos_db_sg" {
  name        = "pos-db-sg"
  description = "Allow PostgreSQL access"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # For dev only! Restrict in production.
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}