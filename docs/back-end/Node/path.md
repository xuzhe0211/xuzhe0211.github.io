---
title: 路径path
---

## 介绍

[path](https://nodejs.org/dist/latest-v14.x/docs/api/path.html) (opens new window)是 node 提供的处理文件和目录路径的工具。

```js
const path = require("path");
```

## node 获取当前路径的三种方法
```js
const { resolve } = require('path');

console.log('__dirname:' + __dirname)
console.log('resolve : ' + resolve('./'))
console.log('cwd :' + process.cwd())
//__dirname : D:\new\node
//resolve   : D:\new\node
//cwd       : D:\new\node
```
可以看到三个命令都返回了相同的路径，但是他们是不一样的
- <span style="color: blue">__dirname: 返回运行文件所在的目录</span>
- <span style="color: blue">resolve('./'):当前命令所在目录</span>
- <span style="color: blue">process.cwd():当前命令所在的目录</span>

我们返回到new的目录，测试一下
```js
const {resolve} = require('path')


console.log('__dirname : ' + __dirname)
console.log('resolve   : ' + resolve('./'))
console.log('cwd       : ' + process.cwd())

//__dirname : D:\node\new
//resolve   : D:\node
//cwd       : D:\node
```
## 示例

```js
const path = require("path");
const pick = require("lodash.pick");

const paths = {
  dir: "dir1/dir2/dir3",
  abDir: "/dir1/dir2/dir3",
  abDirSlash: "/dir1/dir2/dir3/",
  file: "dir1/dir2/dir3/file.js",
  oFile: "file.js",
  mExtFile: "dir1/dir2/dir3/file.spec.js",
  abFile: "/dir1/dir2/dir3/file.js",
};

const segPath = {
  nPath: ["aaa", "bbb", "ccc"],
  abSPath: ["/aaa", "bbb", "ccc"],
  abIPath: ["aaa", "/bbb", "ccc"],
  bPath: ["aaa", "/bbb", "..", "ccc"],
  b2Path: ["aaa", "../..", "ccc"],
  mPath:  ["foo", "/nnn/", "foo//", "bar/baz", "..", "aaa"],
};

// basename 返回 path 的最后一部分
describe("basename should return the last portion of a path", () => {
  test("dir should return dir3", () => {
    const p = paths.dir;

    expect(path.basename(p)).toBe("dir3");
  });
  
  test("abDir should return dir3", () => {
    const p = paths.abDir;

    expect(path.basename(p)).toBe("dir3");
  });

  test("abDirSlash should return dir3", () => {
    const p = paths.abDirSlash;

    expect(path.basename(p)).toBe("dir3");
  });

  test("file should return file.js", () => {
    const p = paths.file;

    expect(path.basename(p)).toBe("file.js");
  });

  test("oFile should return file.js", () => {
    const p = paths.oFile;

    expect(path.basename(p)).toBe("file.js");
  });

  test("mExtFile should return file.spec.js", () => {
    const p = paths.mExtFile;

    expect(path.basename(p)).toBe("file.spec.js");
  });

  test("abFile should return file.js", () => {
    const p = paths.abFile;

    expect(path.basename(p)).toBe("file.js");
  });

  test("(unmatch ext param)file should return file.js", () => {
    const p = paths.file;

    expect(path.basename(p, ".html")).toBe("file.js");
  });

  test("(match ext param)file should return file", () => {
    const p = paths.file;

    expect(path.basename(p, ".js")).toBe("file");
  });

  test("(unmatch ext param)abFile should return file.js", () => {
    const p = paths.abFile;

    expect(path.basename(p, ".html")).toBe("file.js");
  });

  test("(match ext param)abFile should return file", () => {
    const p = paths.abFile;

    expect(path.basename(p, ".js")).toBe("file");
  });
});

// delimiter 返回平台特定的路径界定符
describe("delimiter should return the platform-specific path delimiter", () => {
  const paths = {
    ":": "/usr/bin:/bin",
    ";": "C:\Windows\system32;C:\Windows"
  }

  test("should return correct array", () => {
    const p = paths[path.delimiter]

    if (path.delimiter === ":") {
      expect(p.split(path.delimiter)).toStrictEqual(["/usr/bin", "/bin"]);
    }
    if (path.delimiter === ";") {
      expect(p.split(path.delimiter)).toStrictEqual(["C:\\Windows\\system32", "C:\\Windows"]);
    }
  });
});

// dirname 返回目录名
describe("dirname should return the directory of a path", () => {
  test("dir should return dir1/dir2", () => {
    const p = paths.dir;

    expect(path.dirname(p)).toBe("dir1/dir2");
  });

  test("abDir should return /dir1/dir2", () => {
    const p = paths.abDir;

    expect(path.dirname(p)).toBe("/dir1/dir2");
  });

  test("abDirSlash should return /dir1/dir2", () => {
    const p = paths.abDirSlash;

    expect(path.dirname(p)).toBe("/dir1/dir2");
  });

  test("file should return dir1/dir2/dir3", () => {
    const p = paths.file;

    expect(path.dirname(p)).toBe("dir1/dir2/dir3");
  });

  test("oFile should return .", () => {
    const p = paths.oFile;

    expect(path.dirname(p)).toBe(".");
  });

  test("mExtFile should return dir1/dir2/dir3", () => {
    const p = paths.mExtFile;

    expect(path.dirname(p)).toBe("dir1/dir2/dir3");
  });

  test("abFile should return /dir1/dir2/dir3", () => {
    const p = paths.abFile;

    expect(path.dirname(p)).toBe("/dir1/dir2/dir3");
  });
});

// extname 返回扩展名
describe("extname should return the extension of a path", () => {
  const extPaths = {
    ...paths,
    oMExtFile: "index.coffee.md",
    unExtFile: "index.",
    oFileName: "index",
    oExt: ".index",
    oMExt: ".index.md"
  }

  test("dir should return empty string", () => {
    const p = extPaths.dir;

    expect(path.extname(p)).toBe("");
  });

  test("abDir should return empty string", () => {
    const p = extPaths.abDir;

    expect(path.extname(p)).toBe("");
  });

  test("abDirSlash should return empty string", () => {
    const p = extPaths.abDirSlash;

    expect(path.extname(p)).toBe("");
  });

  test("file should return .js", () => {
    const p = extPaths.file;

    expect(path.extname(p)).toBe(".js");
  });

  test("oFile should return .js", () => {
    const p = extPaths.oFile;

    expect(path.extname(p)).toBe(".js");
  });

  test("mExtFile should return .js", () => {
    const p = extPaths.mExtFile;

    expect(path.extname(p)).toBe(".js");
  });

  test("abFile should return .js", () => {
    const p = extPaths.abFile;

    expect(path.extname(p)).toBe(".js");
  });

  test("oMExtFile should return .md", () => {
    const p = extPaths.oMExtFile;

    expect(path.extname(p)).toBe(".md");
  });

  test("unExtFile should return .", () => {
    const p = extPaths.unExtFile;

    expect(path.extname(p)).toBe(".");
  });

  test("oFileName should return empty string", () => {
    const p = extPaths.oFileName;

    expect(path.extname(p)).toBe("");
  });

  test("oExt should return empty string", () => {
    const p = extPaths.oExt;

    expect(path.extname(p)).toBe("");
  });

  test("oMExt should return .md", () => {
    const p = extPaths.oMExt;

    expect(path.extname(p)).toBe(".md");
  });
});

// parse 根据 path 返回一个对象
describe("parse should parse path and return an object", () => {
  test("parse a normal path string", () => {
    expect(path.parse("/foo/bar/baz.spec.js")).toEqual({
      root: "/",
      dir: "/foo/bar",
      base: "baz.spec.js",
      name: "baz.spec",
      ext: ".js"
    });
  });
});

// format 根据对象返回路径
describe("format should return a path from an object", () => {
  const oPaths = {
    root: "/root",
    dir: "/home/shanyuhai/Test/node",
    base: "path.spec.js",
    name: "path.spec",
    ext: ".js"
  };

  test("root & base(root do not have platform separator)", () => {
    expect(path.format(pick(oPaths, ["root", "base"]))).toBe("/rootpath.spec.js")
  });

  test("root & name & ext(ext should have .)", () => {
    expect(path.format(pick(oPaths, ["root", "name", "ext"]))).toBe("/rootpath.spec.js")
  });

  test("root will be ignored if dir is provided", () => {
    expect(path.format(pick(oPaths, ["root", "dir", "base"]))).toBe("/home/shanyuhai/Test/node/path.spec.js")
  });

  test("name & ext will be ignored if base is provided", () => {
    expect(path.format(pick(oPaths, ["root", "dir", "base", "ext"]))).toBe("/home/shanyuhai/Test/node/path.spec.js")
  });
});

// isAbsolute 检测 path 是否为绝对路径
describe("isAbsolute determines if path is an absolute path", () => {
  test("dir should return false", () => {
    const p = paths.dir;

    expect(path.isAbsolute(p)).toBeFalsy();
  });

  test("abDir should return true", () => {
    const p = paths.abDir;

    expect(path.isAbsolute(p)).toBeTruthy();
  });

  test("file should return false", () => {
    const p = paths.file;

    expect(path.isAbsolute(p)).toBeFalsy();
  });

  test("abFile should return true", () => {
    const p = paths.abFile;

    expect(path.isAbsolute(p)).toBeTruthy();
  });
});

// join 会将给定的路径片段利用界定符链接
describe("join will link the given path segment with the delimiter", () => {
  test("normal path segment will link with the delimiter", () => {
    expect(path.join(...segPath.nPath)).toBe("aaa/bbb/ccc");
  });

  test("absolute normal path segment will link with the delimiter", () => {
    expect(path.join(...segPath.abSPath)).toBe("/aaa/bbb/ccc");
  });

  test("absolute path segment in args do not effect", () => {
    expect(path.join(...segPath.abIPath)).toBe("aaa/bbb/ccc");
  });

  test(".. will back to the upper path level", () => {
    expect(path.join(...segPath.bPath)).toBe("aaa/ccc");
  });

  test("../.. will back to the upper two path level", () => {
    expect(path.join(...segPath.b2Path)).toBe("../ccc");
  });

  test("multiple formats mixed", () => {
    expect(path.join(...segPath.mPath)).toBe("foo/nnn/foo/bar/aaa");
  });
});

// resolve 解析路径或片段为绝对路径
describe("resolve will resolve a sequence of paths or path segments into an absolute path", () => {
  test("dir should return /home/shanyuhai/Test/node-demos/dir1/dir2/dir3", () => {
    const p = paths.dir;

    expect(path.resolve(p)).toBe("/home/shanyuhai/Test/node-demos/dir1/dir2/dir3");
  });

  test("abDirSlash should return /dir1/dir2/dir3", () => {
    const p = paths.abDirSlash;

    expect(path.resolve(p)).toBe("/dir1/dir2/dir3");
  });

  test("oFile should return /home/shanyuhai/Test/node-demos/file.js", () => {
    const p = paths.oFile;

    expect(path.resolve(p)).toBe("/home/shanyuhai/Test/node-demos/file.js");
  });

  test("absolute normal path segment will link with the delimiter", () => {
    expect(path.resolve(...segPath.abSPath)).toBe("/aaa/bbb/ccc");
  });

  test("if after processing all given path segments an absolute path has not yet been generated, the current working directory is used", () => {
    expect(path.resolve(...segPath.nPath)).toBe("/home/shanyuhai/Test/node-demos/aaa/bbb/ccc");
  });

  test("absolute path segment in args will replace before", () => {
    expect(path.resolve(...segPath.abIPath)).toBe("/bbb/ccc");
  });

  test(".. will back to the upper path level", () => {
    expect(path.resolve(...segPath.bPath)).toBe("/ccc");
  });

  test("../.. will back to the upper two path level", () => {
    expect(path.resolve(...segPath.b2Path)).toBe("/home/shanyuhai/Test/ccc");
  });

  test("multiple formats mixed", () => {
    expect(path.resolve(...segPath.mPath)).toBe("/nnn/foo/bar/aaa");
  });
});

// normalize 返回规范化的路径
describe("normalize should return the normalized path", () => {
  test("should return the normalized path and trailing separators are preserved", () => {
    expect(path.normalize("foo/bar//baz/asdf/quux/../")).toBe("foo/bar/baz/asdf/");
  });
});

// relative 返回 from 和 to 的相对路径
describe("relative should return the relative path from `from` to `to`", () => {
  test("absolute path", () => {
    expect(path.relative("/home/shanyuhai", "/etc/zsh/zprofile")).toBe("../../etc/zsh/zprofile");
  });

  test("current path", () => {
    expect(path.relative("node_modules/jest/", "node_modules/jest/bin/jest.js")).toBe("bin/jest.js");
  });

  // before compare they will be calling `path.resolve` on each, so they can get relative path
  test("absolute to relative", () => {
    expect(path.relative("/home/shanyuhai", "node_modules/jest/bin/jest.js")).toBe("Test/node-demos/node_modules/jest/bin/jest.js");
  });
});

// sep 返回平台特定的路径片段分隔符
describe("sep should return the platform-specific path segment separator", () => {
  const paths = {
    "/": "foo/bar/baz",
    "\\": "foo\\bar\\baz"
  }

  test("should return correct array", () => {
    const p = paths[path.sep]

    if (path.sep === "/") {
      expect(p.split(path.sep)).toStrictEqual(["foo", "bar", "baz"]);
    }
    if (path.sep === "\\") {
      expect(p.split(path.sep)).toStrictEqual(["foo", "bar", "baz"]);
    }
  });
});
```
## path.join()及path.resolve()区别
path.join只是简单将路径片段进行拼接，并规范化生成一个路径，而path.resolve则一定会生成一个绝对路径，相当于执行cd操作，与cd操作不同的是，这些路径可以是文件，并且可不必实际存在

平台特定的分隔符”：
- windows下文件路径分隔符使用的是"\"
- Linux下文件路径分隔符使用的是"/"

**相同点**
- 都是对路径进行拼接
- 注意：如果路径中出现『..』或者『../』，那么它前面的路径片段将被丢失

**不同点**
- <span style="color: red">join是把各个path片段连接在一起，resolve把'/'当成更目录</span>

  ```js
  path.join('/a', '/a'); // /a/b
  path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // '/foo/bar/baz/asdf'
  path.resolve('/a', '/b'); // C:/b
  ```
- resolve 在传入非"/"路径时,会自动加上当前目录形成一个绝对路径，而join仅仅用于路径拼接

  ```js
  // 当前路径为C:/user
  path.join('a', 'b', '..', 'd'); // /a/d

  path.resolve('a', 'b', '..', 'd'); // C:/Users/a/d

  path.resolve('/foo/bar', './baz'); // C:/foo/bar/baz

  path.resolve('/foo', '/bar', 'baz') // C:/bar/baz
 
  path.resolve('/foo/bar', '/tmp/file/') // 'C:/tmp/file'
  
  path.resolve('d:/b/c','/a.js') // 'd:/a.js' 更改了盘符
  ```
- 对于长度为零的path片段：join会返回'.',表示当前工作目录;resolve会返回房钱工作目录的绝对路径

  ```js
  path.join(); // '.'
  path.resolve(); // C:/user
  ```