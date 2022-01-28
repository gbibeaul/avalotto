import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(dirname, '..', '..', '..', 'docs');

export async function get(req) {
  const slug = req.params.slug;
  try {
    if (!/^[\d\w-]+$/g.test(slug)) {
      throw new Error(`Invalid slug: ${slug}`);
    }  
    const content = await fs.readFile(path.resolve(docsDir, `${slug}.md`));
    return {
      body: {
        content: content.toString()
      },
    }
  } catch (error) {
    console.error(error);
    return {
      status: 404,
      body: {
        error: 'Not found'
      }
    }
  }
}