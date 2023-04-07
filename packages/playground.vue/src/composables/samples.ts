const files = import.meta.glob('@/samples/*.md', {
    eager: true,
    as: 'raw',
})

export function useSampleFiles() {
    return Object.entries(files).map(([filename, content]) => ({
        name: filename.replace('/src/samples/', '').replace('.md', ''),
        content,
        filename,
    }))
}
