from pathlib import Path
import hashlib
import re
from PIL import Image, ImageDraw, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
CATALOG = (ROOT / 'src/data/catalog.js').read_text(encoding='utf-8')
OUTPUT = ROOT / 'public/images/programs'
OUTPUT.mkdir(parents=True, exist_ok=True)

generated = Path(r'C:\Users\sbs\.codex\generated_images\01a02275-f07b-7da2-b6a3-39ef02fffefa')
category_sources = {
    'uiux-design': generated / 'exec-f58a1ef9-b349-4379-9004-aea88474bb5e.png',
    'foundation': generated / 'exec-68e8132b-a622-46fa-a13e-164b75a521cf.png',
    'frontend': generated / 'exec-f244f893-bbf8-4d45-bc25-4b9bd1df8833.png',
    'backend': generated / 'exec-acace21d-ed8e-4d02-87ba-d367ed0afcd5.png',
    'database': generated / 'exec-4742452d-6a63-453b-a8f6-d5971fd3f87f.png',
    'ai-development': generated / 'exec-155fb2ad-6ba5-4b5f-917e-37f09d4963fa.png',
    'security-infrastructure': generated / 'exec-ed634c8f-5cf0-4f83-af48-0ee1f3321df5.png',
    'content-analytics': generated / 'exec-b158e851-a8b1-4e94-bc92-53ae9443b6ad.png',
    'deployment': generated / 'exec-b3b39b93-4752-486a-bad1-20c95698366b.png',
}
service_sources = [
    generated / name for name in [
        'exec-0f666ef5-24d6-4cdc-a36a-59655f7367ff.png',
        'exec-c30f555e-763a-4fad-87d8-24ca4daf0ca2.png',
        'exec-aefd32d4-fe7e-4e52-8306-28555453f237.png',
        'exec-c7be27d9-8d89-4208-aae2-26187f519845.png',
        'exec-4a13fa8b-e0de-4eaa-834a-3f803bf3a98c.png',
        'exec-d3ce24b6-39c0-45db-8e72-9229e377ba7e.png',
        'exec-82b7e462-12ab-439a-b287-c2612986d94a.png',
        'exec-70279837-a8ae-476b-b03f-e764118fbcee.png',
        'exec-308ae982-c469-41b1-81a3-512cd8d65e42.png',
        'exec-3b59272f-e399-4dfe-ad02-492f91557b84.png',
    ]
]

explicit = re.findall(r"id: '([^']+)'\s*,\s*categoryId: '([^']+)'[^\n]*?title: '([^']+)'", CATALOG)
expanded_block = CATALOG.split('const expansionProgramSpecs = [', 1)[1].split(']\n\nconst expansionPrograms', 1)[0]
expanded = re.findall(r"\['([^']+)',\s*'([^']+)',\s*'([^']+)'", expanded_block)
programs = []
seen = set()
primary_programs = [
    ('web-foundation', 'foundation', 'HTML·CSS·JavaScript로 첫 홈페이지 만들기'),
    ('react-website', 'frontend', 'React 웹사이트 만들기'),
    ('node-backend', 'backend', 'Node.js 웹서비스 기초'),
    ('supabase-database', 'database', 'Supabase 데이터 저장 입문'),
    ('codex-first-service', 'ai-development', '바이브코딩 실전: React·Spring Boot·AWS 웹서비스 구축'),
    ('github-vercel', 'deployment', 'GitHub와 Vercel 배포 입문'),
]
for item in primary_programs + explicit + expanded:
    if item[0] not in seen:
        programs.append(item)
        seen.add(item[0])

service_index = 0
category_index = {}
palette = [(93, 103, 245), (111, 211, 184), (255, 128, 105), (154, 91, 194)]

for program_id, category_id, title in programs:
    index = category_index.get(category_id, 0)
    category_index[category_id] = index + 1
    if category_id == 'service-planning':
        source = service_sources[service_index]
        service_index += 1
    else:
        source = category_sources[category_id]

    image = Image.open(source).convert('RGB')
    ratio = 1.5
    width, height = image.size
    crop_width = min(width, int(height * ratio))
    crop_height = min(height, int(width / ratio))
    drift = ((index % 5) - 2) * 0.025
    left = max(0, min(width - crop_width, int((width - crop_width) * (0.5 + drift))))
    top = max(0, min(height - crop_height, int((height - crop_height) * (0.48 - drift))))
    image = image.crop((left, top, left + crop_width, top + crop_height)).resize((1200, 800), Image.Resampling.LANCZOS)
    image = ImageEnhance.Color(image).enhance(0.94 + (index % 4) * 0.035)

    overlay = Image.new('RGBA', image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    color = palette[index % len(palette)]
    draw.rounded_rectangle((1010, 42, 1152, 184), radius=34, fill=(*color, 218))
    digest = hashlib.sha256(program_id.encode()).digest()
    for dot in range(3):
        x = 1040 + dot * 38
        y = 78 + (digest[dot] % 3) * 23
        draw.ellipse((x, y, x + 20, y + 20), fill=(255, 255, 255, 235))
    image = Image.alpha_composite(image.convert('RGBA'), overlay).convert('RGB')
    image.save(OUTPUT / f'{program_id}.webp', 'WEBP', quality=76, method=6)

print(f'created={len(programs)}')
print(f'max_bytes={max(path.stat().st_size for path in OUTPUT.glob("*.webp"))}')
