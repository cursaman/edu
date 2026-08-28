export function filterPrograms(programs, query) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return programs
  return programs.filter((program) => program.title.toLowerCase().includes(normalizedQuery))
}

export function appendProgram(programs, nextProgram) {
  const title = nextProgram.title.trim()
  if (!title) return programs
  return [...programs, { ...nextProgram, title }]
}
