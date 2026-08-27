$files = Get-ChildItem 'D:\1.me\rich-dad-poor-dad\src' -Recurse -Include *.vue,*.js
foreach ($f in $files) {
  $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
  $original = $content
  $content = $content.Replace([char]0x17A2 + [char]0x1794 + [char]0x17CA + [char]0x179A + [char]0x17C1, '')
  [System.IO.File]::WriteAllText($f.FullName, $content, (New-Object System.Text.UTF8Encoding $false))
}
Write-Host 'noop'