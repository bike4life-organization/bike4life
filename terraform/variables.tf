variable "project_id" {
  description = "The name of the project"
  type        = string
  default     = "bike4life-368520"
}

variable "region" {
  description = "The default compute region"
  type        = string
  default     = "us-east1"
}

variable "zone" {
  description = "The default compute zone"
  type        = string
  default     = "us-east1-b"
}

variable "repository" {
  description = "The name of the Artifact Registry repository to be created"
  type        = string
  default     = "docker-repository"
}

variable "docker_image" {
  description = "The name of the Docker image in the Artifact Registry repository to be deployed to Cloud Run"
  type        = string
  default     = "auth-api"
}
