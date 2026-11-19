import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';

export function openLocalDB(file = ':memory:') {
  const sqlite = new DatabaseSync(file);
  if (!sqlite.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='course_progress'").get()) {
    sqlite.exec(readFileSync(new URL('../drizzle/0000_course_progress.sql', import.meta.url), 'utf8'));
  }
  return {
    close: () => sqlite.close(),
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      return {
        bind(...args) {
          return {
            async first() { return statement.get(...args); },
            async run() { return { meta: { changes: statement.run(...args).changes } }; }
          };
        }
      };
    }
  };
}
