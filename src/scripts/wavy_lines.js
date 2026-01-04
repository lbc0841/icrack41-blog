class AWaves extends HTMLElement {
    connectedCallback() {
      this.svg = this.querySelector('svg')
      this.mouse = {
        x: 0,
        y: 0,
        lx: 0,
        ly: 0,
        sx: 0,
        sy: 0,
        v: 0,
        vs: 0,
        a: 0,
      }
      this.lines = []
      this.paths = []

      this.bindEvents()
      this.setSize()
      this.setLines()

      requestAnimationFrame(this.tick.bind(this))
    }
    bindEvents() {
      window.addEventListener('resize', () => {
        this.setSize()
        this.setLines()
      })
      window.addEventListener('mousemove', (e) => {
        this.updateMousePosition(e.pageX, e.pageY)
      })
      this.addEventListener('touchmove', (e) => {
        e.preventDefault()
        this.updateMousePosition(e.touches[0].clientX, e.touches[0].clientY)
      })
    }
    setSize() {
      this.bounding = this.getBoundingClientRect()
      this.svg.style.width = `${this.bounding.width}px`
      this.svg.style.height = `${this.bounding.height}px`
    }
    setLines() {
      const { width, height } = this.bounding

      this.lines = []
      this.paths.forEach((path) => {
        path.remove()
      })
      this.paths = []

      const xGap = 30;
      const yGap = 30;

      const oWidth = width + 200
      const oHeight = height + 30

      const totalLines = Math.ceil(oWidth / xGap)
      const totalPoints = Math.ceil(oHeight / yGap)

      const xStart = (width - xGap * totalLines) / 2
      const yStart = (height - yGap * totalPoints) / 2

      for (let i = 0; i <= totalLines; i++) {
        const points = []
        for (let j = 0; j <= totalPoints; j++) {
          const point = {
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          }
          points.push(point)
        }
        this.lines.push(points)

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.svg.appendChild(path)
        this.paths.push(path)
      }

      for (let i = 0; i <= totalPoints; i++) {
        const points = []
        for (let j = 0; j <= totalLines; j++) {
          const point = {
            x: xStart + xGap * j,
            y: yStart + yGap * i,
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          }
          points.push(point)
        }
        this.lines.push(points)

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.svg.appendChild(path)
        this.paths.push(path)
      }
    }
    updateMousePosition(x, y) {
      const { mouse } = this
      mouse.x = x - this.bounding.left
      mouse.y = y - this.bounding.top + window.scrollY
    }
    movePoints(time) {
      const { lines, mouse } = this

      lines.forEach((points) => {
        points.forEach((p, i) => {
          const dx = p.x - mouse.sx
          const dy = p.y - mouse.sy
          const d = Math.hypot(dx, dy)
          const l = Math.max(175, mouse.vs)

          if (d < l) {
            const f = 1 - d / l
            p.cursor.vx += Math.cos(mouse.a) * f * mouse.vs * 0.08
            p.cursor.vy += Math.sin(mouse.a) * f * mouse.vs * 0.08
          }

          p.cursor.vx += (0 - p.cursor.x) * 0.005
          p.cursor.vy += (0 - p.cursor.y) * 0.005

          p.cursor.vx *= 0.925
          p.cursor.vy *= 0.925

          p.cursor.x += p.cursor.vx * 2
          p.cursor.y += p.cursor.vy * 2

          p.cursor.x = Math.min(100, Math.max(-100, p.cursor.x))
          p.cursor.y = Math.min(100, Math.max(-100, p.cursor.y))
        })
      })
    }
    moved(point, withCursorForce = true) {
      const coords = {
        x: point.x + (withCursorForce ? point.cursor.x : 0),
        y: point.y + (withCursorForce ? point.cursor.y : 0),
      }

      coords.x = Math.round(coords.x * 10) / 10
      coords.y = Math.round(coords.y * 10) / 10

      return coords
    }
    drawLines() {
      const { lines, moved, paths } = this

      lines.forEach((points, lIndex) => {
        let p1 = moved(points[0], false)
        let d = `M ${p1.x} ${p1.y}`

        points.forEach((p, pIndex) => {
          const isLast = pIndex === points.length - 1
          p = moved(p, !isLast)
          d += `L ${p.x} ${p.y}`
        })

        paths[lIndex].setAttribute('d', d)
      })
    }
    tick(time) {
      const { mouse } = this

      mouse.sx += (mouse.x - mouse.sx) * 0.1
      mouse.sy += (mouse.y - mouse.sy) * 0.1

      const dx = mouse.x - mouse.lx
      const dy = mouse.y - mouse.ly
      const d = Math.hypot(dx, dy)

      mouse.v = d
      mouse.vs += (d - mouse.vs) * 0.1
      mouse.vs = Math.min(100, mouse.vs)

      mouse.lx = mouse.x
      mouse.ly = mouse.y

      mouse.a = Math.atan2(dy, dx)

      this.movePoints(time)
      this.drawLines()

      requestAnimationFrame(this.tick.bind(this))
    }
  }

customElements.define('a-waves', AWaves)