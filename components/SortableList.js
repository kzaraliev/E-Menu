import { useState } from 'react'

export default function SortableList({ 
  items, 
  onReorder, 
  renderItem, 
  className = '',
  itemClassName = '',
  dragHandleClassName = '',
  sortKey = 'sort_order' 
}) {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [isReordering, setIsReordering] = useState(false)

  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', index.toString())
    
    // Add some visual feedback
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      return
    }

    setIsReordering(true)

    try {
      // Calculate new order for the dragged item
      const sortedItems = [...items].sort((a, b) => a[sortKey] - b[sortKey])
      const draggedItem = sortedItems[draggedIndex]
      
      let newOrder
      if (dropIndex === 0) {
        // Dropped at the beginning
        newOrder = sortedItems[0][sortKey] - 1
      } else if (dropIndex >= sortedItems.length - 1) {
        // Dropped at the end
        newOrder = sortedItems[sortedItems.length - 1][sortKey] + 1
      } else {
        // Dropped in the middle
        const beforeItem = sortedItems[dropIndex - (draggedIndex < dropIndex ? 0 : 1)]
        const afterItem = sortedItems[dropIndex + (draggedIndex < dropIndex ? 1 : 0)]
        newOrder = (beforeItem[sortKey] + afterItem[sortKey]) / 2
      }

      await onReorder(draggedItem.id, newOrder)
    } catch (error) {
      console.error('Reordering failed:', error)
    } finally {
      setIsReordering(false)
      setDraggedIndex(null)
      setDragOverIndex(null)
    }
  }

  const sortedItems = [...items].sort((a, b) => a[sortKey] - b[sortKey])

  return (
    <div className={`${className} ${isReordering ? 'pointer-events-none' : ''}`}>
      {isReordering && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {sortedItems.map((item, index) => (
        <div
          key={item.id}
          draggable={!isReordering}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          className={`
            ${itemClassName}
            ${draggedIndex === index ? 'opacity-50' : ''}
            ${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''}
            ${isReordering ? 'cursor-not-allowed opacity-75' : 'cursor-move'}
            transition-all duration-200 relative
          `}
        >
          <div className="flex items-center">
            <div className={`${dragHandleClassName} mr-2 text-gray-400 hover:text-gray-600 ${isReordering ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
            </div>
            <div className="flex-1">
              {renderItem(item, index)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 