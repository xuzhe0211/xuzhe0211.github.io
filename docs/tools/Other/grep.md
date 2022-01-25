---
autoGroup-1: linux命令
title: grep
---

举个例子
```
// 筛选 docker帮助中 包含dns的
docker run --help | grep dns
```

## 基本语法
grep这个linux指令大家一定不陌生，其用于查找文件中符合条件的字符串，下面来看这个高频的指令如何使用
```
grep [选项] 查找内容 [源文件]
```
观察其组成部分，由四部分组成:指令明(grep)、选项、查找内容、源文件，其中需要注意的有两个位置，下来我们一一道来
### 1. 源文件
源文件部分是可有可无的，若不指定任何文件名称或是所给予的文件名为-,则grep指令会从标准输入设备读取数据，使用如下所示
```
// 文件路径为/test

// 接受cat的输入
cat ./test |grep 'hello'

// 存在路径部分参数
grep 'hello' ./test
```
### 2. 选项部分
选项部分比较多，可以通过grep --help指令来看一下有哪些选项
```
Regexp selection and interpretation: // 正则表达式选择和解释
  -E, --extended-regexp     PATTERN is an extended regular expression (ERE)
  -F, --fixed-strings       PATTERN is a set of newline-separated strings
  -G, --basic-regexp        PATTERN is a basic regular expression (BRE)
  -P, --perl-regexp         PATTERN is a Perl regular expression
  -e, --regexp=PATTERN      use PATTERN for matching
  -f, --file=FILE           obtain PATTERN from FILE
  -i, --ignore-case         ignore case distinctions
  -w, --word-regexp         force PATTERN to match only whole words
  -x, --line-regexp         force PATTERN to match only whole lines
  -z, --null-data           a data line ends in 0 byte, not newline

Miscellaneous: // 各种各样的
  -s, --no-messages         suppress error messages
  -v, --invert-match        select non-matching lines // 搜索不匹配的行
  -V, --version             display version information and exit
      --help                display this help text and exit

Output control: // 输出控制
  -m, --max-count=NUM       stop after NUM matches
  -b, --byte-offset         print the byte offset with output lines
  -n, --line-number         print line number with output lines
      --line-buffered       flush output on every line
  -H, --with-filename       print the file name for each match
  -h, --no-filename         suppress the file name prefix on output
      --label=LABEL         use LABEL as the standard input file name prefix
  -o, --only-matching       show only the part of a line matching PATTERN
  -q, --quiet, --silent     suppress all normal output
      --binary-files=TYPE   assume that binary files are TYPE;
                            TYPE is 'binary', 'text', or 'without-match'
  -a, --text                equivalent to --binary-files=text
  -I                        equivalent to --binary-files=without-match
  -d, --directories=ACTION  how to handle directories;
                            ACTION is 'read', 'recurse', or 'skip'
  -D, --devices=ACTION      how to handle devices, FIFOs and sockets;
                            ACTION is 'read' or 'skip'
  -r, --recursive           like --directories=recurse
  -R, --dereference-recursive  likewise, but follow all symlinks
      --include=FILE_PATTERN  search only files that match FILE_PATTERN
      --exclude=FILE_PATTERN  skip files and directories matching FILE_PATTERN
      --exclude-from=FILE   skip files matching any file pattern from FILE
      --exclude-dir=PATTERN  directories that match PATTERN will be skipped.
  -L, --files-without-match  print only names of FILEs containing no match
  -l, --files-with-matches  print only names of FILEs containing matches
  -c, --count               print only a count of matching lines per FILE
  -T, --initial-tab         make tabs line up (if needed)
  -Z, --null                print 0 byte after FILE name

Context control: // 上下文控制
  -B, --before-context=NUM  print NUM lines of leading context
  -A, --after-context=NUM   print NUM lines of trailing context
  -C, --context=NUM         print NUM lines of output context
  -NUM                      same as --context=NUM
      --color[=WHEN],
      --colour[=WHEN]       use markers to highlight the matching strings;
                            WHEN is 'always', 'never', or 'auto'
  -U, --binary              do not strip CR characters at EOL (MSDOS/Windows)
  -u, --unix-byte-offsets   report offsets as if CRs were not there
```
> 看着选项内容真的很多，背起来着实不易，幸好文档中给我们做了分类，只需要记住这些分类是干什么的，然后在需要的时候从里面进行搜索即可快速搜寻到所需用法（感觉看其内容必看菜鸟教程上的内容容易很多）
1. 当需要通过正则的方式进行搜索内容时，去"Regexp selection adn interpretation"区块找选项即可，常用的有
  ```
  -E: 通过正则表达式进行搜索

  grep -E '.*' babel.config.js
  ```
2. 当需要对输出的内容进行控制时，去"Output control"区块找选项即可，常用的有如下几个
  ```
  -m 数量:表示匹配多少次就会停止
  -n：显示匹配行及行号
  -H：打印每一个匹配的文件名
  -r：能够递归查询，即可以输入文件夹查询
  -c：统计匹配到行的个数
  ```
3. 当需要获取输出内容的上下文进行操纵时，去"Context control"区块找选项即可，常用的有如下几个
  ```
  -B 数量、-A 数量、-C 数量：分别表征获取内容前、后、前后几行
  --color：对输出的内容添加颜色
  ```
4. 除了一些划分比较理解的选项，还有一些选项我个人认为划分的并不是很合理，但是它们仍然很重要，让我们一起来看看有哪些：
  ```
  -i：忽略字母大小写
  -v：反向选择，也就是显示出没有搜索出字符串内容的那一行
  ```
## 经典用法
上面已经将其基本使用做了详细的阐述，俗话说的好：光说不练假把式，光练不说真把式，连说带练全把式。既然上面阐述一通理论的东西，下面我们就来实战几个常用场景，将理论付诸于实践。在实战之前先创建一个文件，文件名是test,文件内容如下所示：
```
hello world!!!
dog
cat
pig
big pig
tiger
Elephant
```
1. 从确定文件中过滤处包含pig的
  ```
  $ grep 'pig' ./test
  pig
  big pig
  ```
2. 从包含某一部分内容的文件中过滤包含pig的
  ```
  $ grep 'pig' ./te*
  pig
  big pig
  ```
3. 从某一个文件夹下所有内容中过滤包含pig的
  ```
  $ grep -r 'pig' .
  ./test:pig
  ./test:big pig
  ```
4. 从某一文件中过滤不包含pig的
  ```
  $ grep -v 'pig' ./test
  hello world!!!
  dog
  cat 
  tiger
  Element
  ```
5. 在过滤文件时显示行数
  ```
  $ grep -n 'pig' ./test
  4: pig
  5：big pig
  ```
6. 匹配出以开头的内容(通过基本正则表达式匹配即可，基本正则表达式字符有^$.[]*)
  ```
  $ grep ^p ./test
  pig
  ```
7. 匹配出包含pig或cat内容的行(用到了扩展正则表达式，其在基本正则表达式基础上增加了(){}?+|等)
  ```
  $ grep -E 'pig|cat' ./test
  cat
  pig
  big pig
  ```
8. 匹配处包含hello和world内容的行
  ```
  $ grep 'hello' ./test |grep 'world'
  hello world!!!
  ```
9. 获取到匹配内容‘big pig'的前一行内容
  ```
  $ grep -B1 'big pig' ./test
  pig
  big pig
  ```
10. 获取匹配到pig行的数量
  ```
  $grep -c 'pig' ./test
  2
  ```
11. 获取到的pig行的内容高亮显示
  ```
  $ grep --color 'pig' ./test
  pig
  big pig
  ```

## 资料
[玩转grep指令](https://mp.weixin.qq.com/s/zsFOZZkoqcLBxPLE--3PEg)