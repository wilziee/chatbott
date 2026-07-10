class ThemeManager {
    static initUniverse() {
        const canvas = document.getElementById('universe-canvas');
        const ctx = canvas.getContext('2d');
        let width, height, stars = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5;
                this.speed = Math.random() * 0.5;
                this.alpha = Math.random();
            }
            update() {
                this.y -= this.speed;
                if (this.y < 0) this.y = height;
                this.alpha += (Math.random() - 0.5) * 0.05;
                this.alpha = Math.max(0.1, Math.min(1, this.alpha));
            }
            draw() {
                ctx.fillStyle = `rgba(0, 243, 255, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < 150; i++) stars.push(new Star());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => { star.update(); star.draw(); });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        initStars();
        animate();
    }

    static initClock() {
        const clockEl = document.getElementById('digital-clock');
        setInterval(() => {
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString('id-ID');
        }, 1000);
    }
}
window.ThemeManager = ThemeManager;
