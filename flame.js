(function(){
  const canvas = document.createElement('canvas');
  canvas.id = 'flame-canvas';
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';

  const hero = document.querySelector('.hero');
  if(!hero) return;
  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';
  hero.insertBefore(canvas, hero.firstChild);

  hero.querySelectorAll(':scope > *:not(#flame-canvas)').forEach(el => {
    el.style.position = 'relative';
    el.style.zIndex = '1';
  });

  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize(){
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); init(); });

  class Dot {
    constructor(){ this.reset(true); }
    reset(init){
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 5;
      this.r = Math.random() * 2.2 + 0.4;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.life = 0;
      this.maxLife = Math.random() * 220 + 120;
      this.maxAlpha = Math.random() * 0.6 + 0.25;
    }
    update(){
      this.life++;
      this.x += this.vx;
      this.y += this.vy;
      if(this.life >= this.maxLife || this.y < -5) this.reset(false);
    }
    draw(){
      const t = this.life / this.maxLife;
      let a;
      if(t < 0.12) a = (t/0.12)*this.maxAlpha;
      else if(t > 0.75) a = ((1-t)/0.25)*this.maxAlpha;
      else a = this.maxAlpha;
      if(a < 0.01) return;
      ctx.save();
      const g = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r*2.5);
      g.addColorStop(0, `rgba(255,255,255,${a})`);
      g.addColorStop(0.5, `rgba(210,230,255,${a*0.4})`);
      g.addColorStop(1, `rgba(180,215,255,0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r*2.5, 0, Math.PI*2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    }
  }

  function init(){
    const n = Math.floor(W*H/2800);
    dots = Array.from({length: n}, ()=> new Dot());
  }
  init();

  function loop(){
    ctx.clearRect(0,0,W,H);
    dots.forEach(d=>{ d.update(); d.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();
