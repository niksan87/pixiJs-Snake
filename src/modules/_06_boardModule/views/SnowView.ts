import {
    GameApplication,
    BaseView,
    Graphics,
    EventsManager,
    GameConstants,
    Constants
} from '../../imports';

export class SnowView extends BaseView {
    private particleContainer: PIXI.particles.ParticleContainer;
    private particles: any;
    private baseParticleTexture: PIXI.Texture;

    public addTo(parent: PIXI.Container): void {
        super.addTo(parent);
        this.createParticlesContainer();
        this.createParticleTexture();
        this.generateParticles();
        // Todo not here
        this.addListeners();
    }

    private render(): void {
        if ( GameApplication.app.renderer.height !== innerHeight || GameApplication.app.renderer.width !== innerWidth) {
            GameApplication.app.renderer.resize(innerWidth, innerHeight)
            this.particleContainer.removeChildren()
            this.generateParticles();
        }

        for (let particle of this.particles) {
            if (particle.y > 0){
                particle.x += particle.vx;
            }
            particle.y += particle.vy

            if (Math.random() > 0.9) {
                particle.vx = this.update(particle.vx);
            } 
            if (particle.x > GameApplication.app.renderer.width || particle.x < 0 || particle.y > GameApplication.app.renderer.height){
                this.reset(particle);
            }
        }

        GameApplication.app.renderer.render(this.particleContainer);
    }

    private createParticlesContainer(): void {
        this.particleContainer = new PIXI.particles.ParticleContainer(Constants.Snow.Amount, {
            scale: true,
            position: true,
            rotation: true,
            alpha: true,
        });
        this.addChild(this.particleContainer);
    }

    private floored(value: number): number {
        return Math.floor(Math.random() * value);
    }

    private update(value: number): number {
        return Math.random() > 0.5
        ? Math.max(Constants.Snow.LowerLimitX, value - 1)
        : Math.min(value + 1, Constants.Snow.UpperLimitX)
    }

    private reset(particle: Particle): void {
        particle.x = this.floored(GameApplication.app.renderer.width)
        particle.y = -(particle.size + this.floored(GameApplication.app.renderer.height))
        particle.vy = this.floored(Constants.Snow.UpperLimitY) + 2
    }

    private createSingleParticle(): PIXI.Graphics {
        let particle = new Graphics;
        particle.beginFill(Constants.Snow.Color)
        particle.drawCircle(0, 0, 100)
        particle.endFill();
        return particle;
    }

    private createParticleTexture(): void {
        this.baseParticleTexture = GameApplication.app.renderer.generateTexture(this.createSingleParticle());
    }

    private generateParticles(): void {
        this.particles = [];

        for (let i = 0; i < Constants.Snow.Amount; i++) {
            const SIZE = this.floored(Constants.Snow.MaxSize) + Constants.Snow.MinSize;
            const particle = new Particle(this.baseParticleTexture);
            particle.size = SIZE 
            particle.vx = this.floored(Constants.Snow.UpperLimitX) - Constants.Snow.UpperLimitX
            particle.vy = this.floored(Constants.Snow.UpperLimitY) + 2
            particle.alpha = Math.random()
            particle.x = particle.startX = this.floored(GameApplication.app.renderer.width)
            particle.y = particle.startY = -(SIZE + this.floored(GameApplication.app.renderer.height))
            particle.width = particle.height = SIZE
            this.particleContainer.addChild(particle)
            this.particles.push(particle);
        }
    }

    public stopSnow(): void {
        this.particleContainer.alpha = 0;
        GameApplication.app.ticker.remove(this.render, this);
    }

    public startSnow(): void {
        this.particleContainer.alpha = 1;
        GameApplication.app.ticker.add(this.render, this);
    }

    private addListeners(): void {
        EventsManager.addListener(GameConstants.EVENTS.GAME_START, () => this.startSnow());
        EventsManager.addListener(GameConstants.EVENTS.GAME_RESUME, () => this.startSnow());
        EventsManager.addListener(GameConstants.EVENTS.GAME_PAUSE, () => this.stopSnow());
        EventsManager.addListener(GameConstants.EVENTS.GAME_END, () => this.stopSnow());
    }
}


export class Particle extends PIXI.Sprite{
    public size: any;
    public vx: any;
    public vy: any;
    public startX: any;
    public startY: any;
}
