import { createRequire } from 'module'
import axios from 'axios'
import urlJoin from 'url-join'
import { log } from './log.js'
import semver from 'semver'
import { PACKAGE_TEMP_DIR, REGISTRY, REGISTRY_TB } from './const.js'
import fse from 'fs-extra'
import fs from 'fs'
import npminstall from 'npminstall'
import path from 'path'
export function require(path) {
  return createRequire(import.meta.url)(path)
}

export function isEmptyDir(localPath) {
  const fileList = fs.readdirSync(localPath)
  const filterList = fileList.filter(
    (file) => !file.startsWith('.') && !['node_modules'].includes(file)
  )
  return fileList.length === 0
}

export async function getNewVersion(npmName, currentVersion) {
  if (!npmName) {
    return null
  }
  const registry = getDefaultRegistry(false)
  const url = urlJoin(registry, npmName)
  try {
    const res = await axios.get(url)
    if (res.status === 200) {
      const data = res.data
      let updateVersions = []
      if (currentVersion) {
        updateVersions = Object.keys(data.versions)
          .filter((version) => semver.satisfies(version, `>=${currentVersion}`))
          .sort((a, b) => (semver.gt(a, b) ? -1 : 1))
      } else {
        updateVersions = Object.keys(data.versions).sort((a, b) =>
          semver.gt(a, b) ? -1 : 1
        )
      }
      if (updateVersions && updateVersions.length > 0) {
        return updateVersions[0]
      }
    }
  } catch (e) {
    log.error('HTTP', `请求${npmName}包信息失败。${e.message}`)
  }

  return null
}
export function getDefaultRegistry(isOrigin) {
  return isOrigin ? REGISTRY : REGISTRY_TB
}

export async function downPackage(localPath, packageName, packageVersion) {
  fse.ensureDirSync(localPath)
  await npminstall({
    root: localPath,
    registry: getDefaultRegistry(),
    pkgs: [
      {
        name: packageName,
        version: packageVersion || ''
      }
    ]
  })
  const nameList = packageName.split('/')

  if (nameList.length > 2) {
    return path.join(localPath, PACKAGE_TEMP_DIR, nameList[0], nameList[1])
  }
  return path.join(localPath, PACKAGE_TEMP_DIR, packageName)
}
export function getPackage(localPath, packageName) {
  let tempPath = path.join(localPath, PACKAGE_TEMP_DIR, packageName)
  if (fse.pathExistsSync(tempPath)) {
    return fs.readlinkSync(tempPath)
  }
  return false
}

export async function updatePackage(localPath, packageName) {
  let latestPackageVersion = await getNewVersion(packageName)

  const data = await downPackage(localPath, packageName, latestPackageVersion)
  // log.info('更新提示：', `${packageName}更新到${latestPackageVersion}`)
  return data
}
