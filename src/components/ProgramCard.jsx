export default function ProgramCard({ program }) {
  return (
    <article className={`program-card program-card-${program.color}`}>
      <div className="program-card-heading">
        <span className="program-number" aria-hidden="true">
          {program.number}
        </span>
        <span className="program-status">{program.status}</span>
      </div>

      <p className="program-category">{program.category}</p>
      <h3 className="program-title">{program.title}</h3>
      <p className="program-description">{program.description}</p>

      <div className="program-meta" aria-label="교육 정보">
        <span>{program.level}</span>
        <span aria-hidden="true">·</span>
        <span>{program.duration}</span>
      </div>

      <a className="program-link" href={`#/programs/${program.id}`}>
        프로그램 안내 보기 <span aria-hidden="true">↗</span>
      </a>
    </article>
  )
}
