const fs = require('fs');

const files = [
  'public/data/projects.json',
  'public/data/certificates.json'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Заменяем %20 на пробелы
  content = content.replaceAll('%20', ' ');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Исправлен: ${file}`);
});

console.log('🎉 Все пробелы исправлены!');