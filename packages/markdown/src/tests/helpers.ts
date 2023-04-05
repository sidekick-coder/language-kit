const files = import.meta.glob('./fixtures/*.md', {
  eager: true,
  as: 'raw'
})

export function useFixturesFiles() {
  return Object.entries(files).map(([filename, content]) => ({
    name: filename.replace('./fixtures/', '').replace('.md', ''),
    content,
    filename
  }))
}
