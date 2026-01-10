import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

export function Whiteboard({ user }: { user: { uid: string } | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [drawing, setDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvas.clientWidth * devicePixelRatio
    canvas.height = canvas.clientHeight * devicePixelRatio
    const context = canvas.getContext('2d')
    if (!context) return
    context.scale(devicePixelRatio, devicePixelRatio)
    context.lineCap = 'round'
    context.strokeStyle = '#000'
    context.lineWidth = 2
    setCtx(context)

    if (user) {
      const saved = localStorage.getItem(`drafty-whiteboard-${user.uid}`)
      if (saved) {
        const img = new Image()
        img.onload = () => context.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight)
        img.src = saved
      }
    }
  }, [user])

  const start = (e: MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true)
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    ctx?.beginPath()
    ctx?.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const move = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    ctx?.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx?.stroke()
  }

  const end = () => {
    setDrawing(false)
    ctx?.closePath()
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (user) localStorage.removeItem(`drafty-whiteboard-${user.uid}`)
  }

  const save = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const data = canvas.toDataURL()
    if (user) localStorage.setItem(`drafty-whiteboard-${user.uid}`, data)
  }

  return (
    <div>
      <div style={{ marginBottom: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={save} className="primary">Save</button>
        <button onClick={clear}>Clear</button>
      </div>
      <div style={{ border: '1px solid var(--border-color)', borderRadius: 8 }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: 400 }}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
        />
      </div>
    </div>
  )
}
