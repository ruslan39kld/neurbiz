-- ============================================================
-- Supabase Migration: Sync schema with neurbiz codebase
-- Run this in Supabase SQL Editor
-- ============================================================

-- Добавляем все недостающие колонки в таблицу projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS icon text DEFAULT '🚀';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stage text DEFAULT 'MVP';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS detail text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS result text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tasks jsonb DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stats jsonb DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "imageUrl" text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "videoUrl" text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "liveUrl" text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_url text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS role text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order int DEFAULT 0;

-- Добавляем все недостающие колонки в таблицу certificates
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS org text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS year text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS cert_url text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS image text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS sort_order int DEFAULT 0;

-- Создаём таблицу api_keys если не существует
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key_name text UNIQUE NOT NULL,
  key_value text,
  updated_at timestamp DEFAULT now()
);

-- Обновляем RLS политики
DROP POLICY IF EXISTS "allow all" ON projects;
DROP POLICY IF EXISTS "allow all" ON certificates;
DROP POLICY IF EXISTS "allow all" ON api_keys;
DROP POLICY IF EXISTS "public read" ON projects;
DROP POLICY IF EXISTS "public write" ON projects;
DROP POLICY IF EXISTS "public read" ON certificates;
DROP POLICY IF EXISTS "public write" ON certificates;
DROP POLICY IF EXISTS "anon_all" ON projects;
DROP POLICY IF EXISTS "anon_all" ON certificates;
DROP POLICY IF EXISTS "anon_all" ON api_keys;

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all" ON projects FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON certificates FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON api_keys FOR ALL TO anon USING (true) WITH CHECK (true);

-- Обновляем кеш схемы PostgREST
NOTIFY pgrst, 'reload schema';
