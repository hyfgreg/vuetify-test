// 公共函数

// 判断某个变量是否为空, 逻辑和python类似
export function toBool(value) {
  if ([undefined, null, NaN].includes(value)) {
    return false
  }

  let _type
  if (Array.isArray(value)) {
    _type = 'array'
  } else {
    _type = typeof value
  }

  if (_type === 'boolean') {
    return value
  }

  if (_type === 'string') {
    return value !== ''
  }

  if (_type === 'number') {
    return value !== 0
  }

  if (_type === 'array') {
    return value.length !== 0
  }

  if (_type === 'object') {
    return JSON.stringify(value) !== '{}'
  }
  console.error(`not find type for toBool value is ${value} type is ${_type}`)
}
