// 🚀 АВТОМАТИЧЕСКИЙ ЭКСПОРТ ИЗ SUPABASE (ES Modules версия)
// Запуск: node export_supabase_esm.js

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import https from 'https'
import dotenv from 'dotenv'

// Загружаем переменные из .env
dotenv.config()

// ===== НАСТРОЙКИ =====
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

// Проверяем что ключи загрузились
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Ошибка: не найдены SUPABASE_URL или SUPABASE_KEY в .env файле')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Папка для экспорта
const OUTPUT_DIR = './exported_data'
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images')

// ===== ФУНКЦИИ =====

// Создание директорий
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Скачивание файла
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }
      
      const fileStream = fs.createWriteStream(filepath)
      response.pipe(fileStream)
      
      fileStream.on('finish', () => {
        fileStream.close()
        resolve()
      })
      
      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {})
        reject(err)
      })
    }).on('error', reject)
  })
}

// ===== ЭКСПОРТ ДАННЫХ =====

async function exportData() {
  console.log('🚀 Начинаем экспорт данных из Supabase...\n')
  
  // Создаём папки
  ensureDir(OUTPUT_DIR)
  ensureDir(IMAGES_DIR)
  
  const stats = {
    projects: 0,
    certificates: 0,
    reviews: 0,
    images: 0
  }
  
  try {
    // 1. Экспорт проектов
    console.log('📦 Экспортируем проекты...')
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true })
    
    if (projectsError) {
      console.error('❌ ОШИБКА:', projectsError.message)
      console.error('Детали:', projectsError)
    } else {
      stats.projects = projects.length
      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'projects.json'),
        JSON.stringify(projects, null, 2)
      )
      console.log(`✅ Экспортировано ${projects.length} проектов\n`)
    }
    
    // 2. Экспорт сертификатов
    console.log('🎓 Экспортируем сертификаты...')
    const { data: certificates, error: certsError } = await supabase
      .from('certificates')
      .select('*')
      .order('id', { ascending: true })
    
    if (certsError) {
      console.error('❌ ОШИБКА:', certsError.message)
    } else {
      stats.certificates = certificates.length
      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'certificates.json'),
        JSON.stringify(certificates, null, 2)
      )
      console.log(`✅ Экспортировано ${certificates.length} сертификатов\n`)
    }
    
    // 3. Экспорт отзывов (если есть)
    console.log('💬 Экспортируем отзывы...')
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
    
    if (reviewsError) {
      console.log('ℹ️  Таблица reviews не найдена (это нормально)\n')
    } else {
      stats.reviews = reviews.length
      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'reviews.json'),
        JSON.stringify(reviews, null, 2)
      )
      console.log(`✅ Экспортировано ${reviews.length} отзывов\n`)
    }
    
    // 4. Экспорт изображений из Storage
    console.log('📸 Экспортируем изображения из Storage...')
    
    const { data: files, error: storageError } = await supabase
      .storage
      .from('neurbiz')
      .list()
    
    if (storageError) {
      console.log('ℹ️  Не удалось получить список файлов из Storage')
      console.log('   Это нормально если файлы уже в проекте\n')
    } else if (files && files.length > 0) {
      let downloadedCount = 0
      
      for (const file of files) {
        try {
          const { data } = supabase
            .storage
            .from('neurbiz')
            .getPublicUrl(file.name)
          
          const publicUrl = data.publicUrl
          const localPath = path.join(IMAGES_DIR, file.name)
          
          await downloadFile(publicUrl, localPath)
          downloadedCount++
          process.stdout.write(`\r   Скачано: ${downloadedCount}/${files.length}`)
        } catch (err) {
          // Пропускаем ошибки скачивания отдельных файлов
        }
      }
      
      stats.images = downloadedCount
      console.log(`\n✅ Скачано ${downloadedCount} изображений\n`)
    }
    
    // 5. Сохранение статистики
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'export_summary.json'),
      JSON.stringify({
        exportDate: new Date().toISOString(),
        stats: stats
      }, null, 2)
    )
    
    // Финальный отчёт
    console.log('==================================================')
    console.log('✅ ЭКСПОРТ ЗАВЕРШЕН!')
    console.log('==================================================\n')
    console.log(`📁 Все файлы сохранены в папке: ${OUTPUT_DIR}`)
    console.log('📊 Сводка:')
    console.log(`   - Проекты: ${stats.projects}`)
    console.log(`   - Сертификаты: ${stats.certificates}`)
    console.log(`   - Отзывы: ${stats.reviews}`)
    console.log(`   - Изображения: ${stats.images}`)
    console.log('\n✅ Теперь можно удалить Supabase и использовать JSON!\n')
    
  } catch (error) {
    console.error('\n❌ КРИТИЧЕСКАЯ ОШИБКА:', error)
    process.exit(1)
  }
}

// Запуск
exportData()