export default function ProgramCard({ program }) {
  const fallbackImage = `${import.meta.env.BASE_URL}images/edu-hero.webp`

  return (
    <article className={`program-card program-card-${program.color}`}>
      <img
        alt={program.imageAlt || `${program.title} 교육 프로그램 대표 이미지`}
        className="program-card-image"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null
          event.currentTarget.src = fallbackImage
        }}
        src={program.image || fallbackImage}
      />
      <div className="program-card-heading">
        <span className="program-number" aria-hidden="true">
          {program.number}
        </span>
        <span className="program-status">{program.status}</span>
      </div>

      <span className={`learning-track-badge learning-track-${program.learningTrack || '입문'}`}>{program.learningTrack || '입문'} 트랙</span>

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

