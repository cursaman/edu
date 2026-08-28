export function filterPrograms(programs, query) {
  return programs.filter((program) => program.title.toLowerCase().includes(query.trim().toLowerCase()))
}

export function appendProgram(programs, nextProgram) {
  const title = nextProgram.title.trim()
  if (!title) return programs
  return [...programs, { ...nextProgram, title }]
}
