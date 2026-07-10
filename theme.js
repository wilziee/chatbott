export class UniverseTheme {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        const particleCount = Math.floor(window.innerWidth / 10);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                alpha: Math.random()
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Efek Twinkling
            p.alpha += (Math.random() - 0.5) * 0.05;
            if(p.alpha < 0.1) p.alpha = 0.1;
            if(p.alpha > 1) p.alpha = 1;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            this.ctx.fill();
        });

        // Shooting star occasional
        if (Math.random() < 0.01) {
            this.drawShootingStar();
        }

        requestAnimationFrame(() => this.animate());
    }

    drawShootingStar() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * (this.canvas.height / 2);
        const length = Math.random() * 80 + 20;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - length, y + length);
        this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.8)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
}
