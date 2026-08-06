/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2026-06-23
 * @Description: Load meta files dynamically
 */

const licenseName = process.env.NEXT_PUBLIC_LICENSE_NAME || "sky";

async function loadMetaFile(path: string) {
  try {
    const module = await import(`./${licenseName}/${path}`);
    return module.default;
  } catch {
    try {
      const module = await import(`./${path}`);
      return module.default;
    } catch {
      return {};
    }
  }
}

export async function getMeta(lang: string) {
  const [meta, meta_home, meta_login, meta_register] = await Promise.all([
    loadMetaFile(`${lang}.json`),
    loadMetaFile(`home/${lang}.json`),
    loadMetaFile(`login/${lang}.json`),
    loadMetaFile(`register/${lang}.json`),
  ]);

  return {
    meta,
    meta_home,
    meta_login,
    meta_register,
  };
}