/**
 * Shared types for page templates.
 *
 * BreadcrumbTrailItem named to avoid collision with the `BreadcrumbItem`
 * React component exported by `../components/breadcrumb`.
 */

export interface BreadcrumbTrailItem {
  label: string
  href?: string
}
