# ====================================================================
# setup_git_sync.ps1
# --------------------------------------------------------------------
# 目的: 將本 repo 同步至 4 個 GitHub 帳號，採用「影子儲存庫」(shadow
#       repos) 架構。所有 URL 皆加入 `origin` 的 push URL list，
#       執行 `git push` 時會自動推送至所有 4 個遠端。
#
# 帳號角色:
#   - chiisen:           主帳號（開發者本人）
#   - edwin45168899:     影子 #1（備援 / 分發）
#   - edwiin1688:        影子 #2（備援 / 分發）
#   - NathanEvans1221:   影子 #3（備援 / 分發）
#
# 設計意圖:
#   影子帳號的存在是刻意設計的，並非遺留的遠端設定。詳見 README
#   「多帳號同步架構」段落與 issue #4。
#
# 使用時機:
#   - 首次 clone 專案後，設定本機 origin 一次
#   - 新增 / 移除影子帳號時，重新執行以更新 URL list
#
# 注意事項:
#   - 本腳本不具幂等性，重複執行會累加 URL。如需重設請先執行
#     `git remote set-url --delete --push origin <url>`
#   - 需要各帳號的 SSH 設定（如 github.com-chiisen、github.com-edwiin1688）
#     已正確配置於 ~/.ssh/config
#   - 每個影子 repo 必須先在 GitHub 上手動建立（腳本不會自動建立）
# ====================================================================

$RepoName = "superpowers_todo"

$BackupUrl = "git@github.com:edwin45168899/$RepoName.git"
$MainUrl = "git@github.com-chiisen:chiisen/$RepoName.git"
$MainUrl1 = "git@github.com-edwiin1688:edwiin1688/$RepoName.git"
$MainUrl2 = "git@github.com-NathanEvans1221:NathanEvans1221/$RepoName.git"

Write-Output "正在設定 Git 遠端同步 (Repo: $RepoName)..."
Write-Output "備份遠端: $BackupUrl"
Write-Output "主要遠端: $MainUrl"
Write-Output "主要遠端1: $MainUrl1"
Write-Output "主要遠端2: $MainUrl2"

# 1. 加入 backup repo 到 origin 的 push list
git remote set-url --add --push origin $BackupUrl

# 2. 加入主要 repo 到 origin 的 push list
git remote set-url --add --push origin $MainUrl
git remote set-url --add --push origin $MainUrl1
git remote set-url --add --push origin $MainUrl2

Write-Output "設定完成。目前的 remote 設定如下："
git remote -v
