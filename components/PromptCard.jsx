import React from 'react'

const PromptCard = ({ key, post, handleTagClick }) => {
  return (
    <div>{post.prompt}</div>
  )
}

export default PromptCard