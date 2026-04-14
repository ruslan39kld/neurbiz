const fs = require('fs');

const files = [
  'public/data/projects.json',
  'public/data/certificates.json'
];

const oldUrl = 'https://fszyqkfwggdcmuywtzhp.supabase.co/storage/v1/object/public/portfolio/';
const newUrl = '/images/projects/';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replaceAll(oldUrl, newUrl);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Обновлен: ${file}`);
});

console.log('🎉 Все ссылки заменены!');