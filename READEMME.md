#Git学习笔记
## 一、git回退到某个版本：
 + 回退到指定版本（只包含提交信息）
  1. git reset --soft HEAD
 + 回退到指定版本（包括提交信息和代码）
  1. 回退到上次提交的版本
     git reset --hard HEAD^
  2. 回退到前n次提交的版本
     git reset --hard HEAD~n
  3. 回退/前进到指定commit的sha码
     git reset --hard 指定commit的sha码
 + 强推到远程：
  - git push origin HEAD -- force
## 二、git暂存
 + 暂存 git stash 或者 git stash save "添加备注"
 + 取回暂存 git stash pop
 + 下面的不对
 + 暂存所有 git add . 或者 git add --all
 + 暂存文件夹 git add 文件夹名
 + 暂存单个文件 git add 文件名
 + 暂存多个文件 git add file1 file2 file3 或者 git add file 多次提交
 + 暂存指定目录(conifg)下子及其所有文件 git conifg/*
 + 暂存指定目录(conifg)下的所有vue单组件文件 git config/*.vue

 
## 三、修改历史提交
 + 当发现代码漏提或者错提时，对commit但未推送到远程分支的commit message修改步骤
  1. 使用git commit --amend命令调出commit信息
  2. 键入"i"进行信息修改
  3. esc退出修改
  4. 键入":wq"退出修改界面
  5. 推送到远程
  
## 四、git变基
 + 概念：提取某个分支的所有修改应用到另一个分支的操作叫做”变基“
 + 最简单都变基示例（将develop分支的提交应用到master分支）
  1. 先保证切换到master分支 git checkout master 或者 git switch master（新版git）
  2. 然后执行变基的命令 git rebase develope

## 五、分支合并和冲突解决
 + 切换分支
 git checkout -b dev(本地) origin/dev(远程)
 git switch -c dev (新版git)
 + 分支合并
  1. 使用checkout命令切换到主分支 git checkout master 或者 git switch master（新版git）
  2. 使用merge命令合并分支 git merge dev
 + 解决冲突
  - 本地冲突
   1. 使用IDE查看冲突地方的代码：git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容
   2. 修改冲突的地方后重新git add 暂存文件夹
   3. 使用git commit -m message 提交修改
   4. 使用git push 命令推送到远程
   
  - 远程冲突
   1. 先将本地代码储藏下来 git stash
   2. 将远程代码拉取下来 git pull origin master
   3. git stash pop
 
## 六、抽取某个分支的单个commit到另一分支
 + 切换到要接收提取的分支 git checkout master 
 + 提取某次提交的哈希 git cherry-pick commitId
 + 如果希望提取A~B（A在B前面的提交哈希值）git cherry-pick A..B （不包含A）git cherry-pick A^..B （包含A）

## 七、删除某个已提交的commit（如删除commitA）
 + 使用git rebase -i 要删除的commit的前一个id（比如要删除commitA，而commitA是在commitB之后提交的，那么这里的id就是commitB）
 + 键入i将 commitA之前的pick改为drop，键入ESC退出
 + 键入:wq退出编辑
 + 使用git push origin -f推送到远程
