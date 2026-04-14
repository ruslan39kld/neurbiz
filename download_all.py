import json
import urllib.request
import os
from pathlib import Path

print("🚀 Скачивание всех файлов из Supabase...\n")

# Читаем JSON файлы
with open('exported_data/projects.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

with open('exported_data/certificates.json', 'r', encoding='utf-8') as f:
    certificates = json.load(f)

# Создаём папку для изображений
output_dir = Path('exported_data/images')
output_dir.mkdir(parents=True, exist_ok=True)

# Собираем все URL
all_files = []

# Из проектов
for project in projects:
    if project.get('imageUrl'):
        filename = project['imageUrl'].replace('/images/projects/', '')
        url = f"https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/{filename}"
        all_files.append({'url': url, 'filename': filename, 'type': 'project'})

# Из сертификатов
for cert in certificates:
    if cert.get('cert_url'):
        url = cert['cert_url']
        filename = url.split('/')[-1]
        all_files.append({'url': url, 'filename': filename, 'type': 'certificate'})

# Удаляем дубликаты
seen = set()
unique_files = []
for f in all_files:
    if f['filename'] not in seen:
        seen.add(f['filename'])
        unique_files.append(f)

print(f"📊 Статистика:")
print(f"   Проекты: {len(projects)}")
print(f"   Сертификаты: {len(certificates)}")
print(f"   Файлов для скачивания: {len(unique_files)}\n")

# Скачиваем файлы
downloaded = 0
skipped = 0

for i, file in enumerate(unique_files, 1):
    filepath = output_dir / file['filename']
    
    # Пропускаем если файл уже есть
    if filepath.exists():
        print(f"⏭️  [{i}/{len(unique_files)}] Пропущен (уже есть): {file['filename']}")
        skipped += 1
        continue
    
    try:
        print(f"⬇️  [{i}/{len(unique_files)}] Скачиваю: {file['filename']}")
        urllib.request.urlretrieve(file['url'], filepath)
        downloaded += 1
    except Exception as e:
        print(f"❌ Ошибка: {file['filename']} - {e}")
        skipped += 1

print("\n" + "="*50)
print("✅ СКАЧИВАНИЕ ЗАВЕРШЕНО!")
print("="*50)
print(f"📁 Папка: {output_dir.absolute()}")
print(f"✅ Скачано: {downloaded} файлов")
print(f"⏭️  Пропущено: {skipped} файлов")
print()