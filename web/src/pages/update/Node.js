import {ElMessage as Message} from "element-plus"

function getProperty (obj, path) {
  let paths = path.split('.')
  let value = obj
  do {
    value = value[paths.shift()]
  } while (paths.length)

  return value
}

export default class Node {
  constructor (key, value, json, parent) {
    this.key = key
    this.children = []
    parent && (this.parent = parent)
    if (typeof value === 'object') {
      Object.keys(value).forEach(k => {
        this.append(new Node(k, value[k], json,this))
      })
    }
    this.languages = {}
    if (json) {
      this.languages = Object.keys(json).reduce((p, c) => {
        let messages = json[c]
        // 获取到当前路径的值
        p[c] = getProperty(messages, this.fullPath)
        return p
      }, {})
    }
  }

  getLang (lang) {
    let message = {}
    if (this.children.length) {
      message[this.key] = this.children.reduce((p, c) => {
        return Object.assign(p, c.getLang(lang))
      }, {})
    } else {
      message[this.key] = this.languages[lang]
    }

    return message
  }

  get fullPath () {
    return this.parent ? `${this.parent.fullPath}.${this.key}` : this.key
  }

  append (child) {
    child.parent = this

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].key === child.key) {
        Message.error("不可以添加重复key")
        return
      }
    }

    this.children.push(child)
  }

  remove () {
    this.parent.children = this.parent.children.filter(
      child => child.key !== this.key
    )

    if (this.parent.children.length === 0) {
      this.parent.languages = {}
    }
  }

  setContent (lang, content) {
    this.languages = {
      ...this.languages,
      [lang]: content,
    }
  }
}
