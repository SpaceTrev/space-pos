# Note: Stripe does not natively support Terraform but we simulate env variables
# and add a placeholder for testing resources

terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

provider "local" {}

resource "local_file" "stripe_env" {
  content  = <<EOT
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_1234
STRIPE_SECRET_KEY=sk_test_5678
EOT
  filename = "${path.module}/.stripe.env"
}