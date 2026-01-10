import { WhiteboardIcon } from '../icons'
import { Whiteboard } from '../components/Whiteboard'

export function WhiteboardPage({ user }: { user: { uid: string } | null }) {
  return (
    <div className="mode-container">
      <div className="mode-content">
        <div className="mode-header">
          <WhiteboardIcon size={48} />
          <h2>Whiteboard</h2>
          <p>Draw and save sketches</p>
        </div>
        <div className="mode-body">
          <Whiteboard user={user} />
        </div>
      </div>
    </div>
  )
}
