// 🚀 СКАЧИВАНИЕ ВСЕХ ФАЙЛОВ ИЗ SUPABASE STORAGE
// Запуск: node download_storage.js

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import https from 'https'
import dotenv from 'dotenv'

dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Ошибка: не найдены SUPABASE_URL или SUPABASE_KEY в .env файле')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const IMAGES_DIR = './exported_data/images'

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed: ${response.statusCode}`))
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

async function downloadStorage() {
  console.log('📸 Скачиваем ВСЕ файлы из Supabase Storage...\n')
  
  ensureDir(IMAGES_DIR)
  
  try {
    const { data: files, error } = await supabase
      .storage
      .from('portfolio')
      .list('', {
        limit: 1000,
        sortBy: { column: 'name', order: 'asc' }
      })
    
    if (error) {
      console.error('❌ Ошибка получения списка файлов:', error)
      return
    }
    
    console.log(`📦 Найдено файлов: ${files.length}\n`)
    
    let downloadedCount = 0
    let skippedCount = 0
    
    for (const file of files) {
      try {
        const { data } = supabase
          .storage
          .from('portfolio')
          .getPublicUrl(file.name)
        
        const publicUrl = data.publicUrl
        const localPath = path.join(IMAGES_DIR, file.name)
        
        await downloadFile(publicUrl, localPath)
        downloadedCount++
        
        process.stdout.write(`\r✅ Скачано: ${downloadedCount}/${files.length} | Пропущено: ${skippedCount}`)
      } catch (err) {
        skippedCount++
        process.stdout.write(`\r✅ Скачано: ${downloadedCount}/${files.length} | Пропущено: ${skippedCount}`)
      }
    }
    
    console.log('\n\n==================================================')
    console.log('✅ СКАЧИВАНИЕ ЗАВЕРШЕНО!')
    console.log('==================================================')
    console.log(`📁 Папка: ${IMAGES_DIR}`)
    console.log(`✅ Скачано: ${downloadedCount} файлов`)
    console.log(`⚠️  Пропущено: ${skippedCount} файлов\n`)
    
  } catch (error) {
    console.error('\n❌ ОШИБКА:', error)
  }
}

downloadStorage()