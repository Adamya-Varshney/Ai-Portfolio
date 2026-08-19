export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function fromSlug(slug: string, projects: any[]): any | undefined {
  return projects.find(p => toSlug(p.title) === slug);
}
