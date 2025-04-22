import React, { useState } from 'react'

interface GitHubAvatarProps {
  avatarUrl: string
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>
  username: string
  size?: number
}

const GitHubAvatar: React.FC<GitHubAvatarProps> = ({
  username,
  size = 40,
  avatarUrl,
  setAvatarUrl
}) => {
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchGitHubAvatar = async () => {
    if (!username) {
      setError('请输入用户名')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (!response.ok) {
        throw new Error('❌')
      }
      const data = await response.json()
      setAvatarUrl(data.avatar_url)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取头像失败')
      setAvatarUrl('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        {error ? (
          <div className="text-red-500 text-xs">{error}</div>
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${username}'s GitHub avatar`}
            className="rounded-full"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="animate-pulse bg-gray-200 rounded-full"
            style={{ width: size, height: size }}
          />
        )}
      </div>
      <button
        onClick={fetchGitHubAvatar}
        disabled={isLoading}
        className={`px-2 py-1 text-sm text-white rounded transition-colors ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? '...' : '查询'}
      </button>
    </div>
  )
}

export default GitHubAvatar
