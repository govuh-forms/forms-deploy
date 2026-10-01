output "role_arn" {
  value = aws_iam_role.gds_user_role.arn
}

output "role_name" {
  value = aws_iam_role.gds_user_role.name
}
