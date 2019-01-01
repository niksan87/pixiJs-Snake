export const Constants = {
    AppName: 'gameApplication',
    DebugMode: true,
    ElementsSafeMargin: 4,
    StartSnakeLength: 3,
    StartingSpeed: 0.2,
    SpeedIncreaseOnEvery: 2,
    SpeedIncreasePercentage: 5,
    TimeToStartAfterPlayClick: 2,
    DarkOverlayOpacity: 0.6,
    Snow: {
        Active: true,
        UpperLimitY: 10,
        UpperLimitX: 2,
        LowerLimitX: -2,
        MaxSize: 6,
        MinSize: 2,
        Amount: 200,
        Color: 0xffffff
    },
    AppSettings: {
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true
    },
    Animations: {
        Duration: 1
    },
    Assets: {
        Images: {
            Url: 'img/',
            Names: {
                'bg': 'bg.jpg',
                'grid': 'grid.png',
                'apple': 'apple.png',
                'banana': 'banana.png',
                'berry': 'berry.png',
                'snow_frame': 'snow_frame.png',
                'nut': 'nut.png',
                'pineapple': 'pineapple.png',
                'snake_head': 'snake_head.png',
                'snake_body': 'snake_body.png',
                'snake_tail': 'snake_tail.png',
                'snake_corner_lu': 'snake_corner_lu.png',
                'snake_corner_ru': 'snake_corner_ru.png',
                'snake_corner_rd': 'snake_corner_rd.png',
                'snake_corner_ld': 'snake_corner_ld.png',
                'btn_bg': 'btn_bg.png',
                'btn_bg_hover': 'btn_bg_hover.png',
                'logo': 'logo.png'
            }
        },
        Loader: {
            PrimaryColor: 0X78AB46,
            SecondaryColor: 0x000000
        }
    },
    Texts: {
        PlayButton: 'Play',
        PlayAgainButton: 'Play again',
        GameOver: 'Game over.\n Snake length is ',
        InfoText: 'Use ARROW keys to navigate and\nSPACE BAR to pause game.',
        GamePaused: 'Game paused.\nUse SPACE key to resume.\nCurrent snake length is '
    }    
}