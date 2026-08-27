export function filterLessons(items,query){/* TODO: 검색 규칙을 순수 함수로 분리하세요. */return items}
export default function TestableList({items=[]}){return <p>{filterLessons(items,'React').length}개</p>}
