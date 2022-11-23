##############################################
#       Deploy API to Google Cloud Run       #
##############################################
# Deploy image to Cloud Run
resource "google_cloud_run_service" "api_test" {
  provider = google-beta
  name     = "api-test"
  location = var.region
  template {
    spec {
      containers {
        image = "us-east1-docker.pkg.dev/${var.project_id}/${var.repository}/${var.docker_image}"
        resources {
          limits = {
            "memory" = "1G"
            "cpu"    = "1"
          }
        }
      }
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale" = "0"
        "autoscaling.knative.dev/maxScale" = "1"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
  depends_on = [google_artifact_registry_repository_iam_member.docker_pusher_iam]
}
# Create a policy that allows all users to invoke the API
data "google_iam_policy" "noauth" {
  provider = google-beta
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}
# Apply the no-authentication policy to our Cloud Run Service.
resource "google_cloud_run_service_iam_policy" "noauth" {
  provider    = google-beta
  location    = var.region
  project     = var.project_id
  service     = google_cloud_run_service.api_test.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
output "cloud_run_instance_url" {
  value = google_cloud_run_service.api_test.status.0.url
}
