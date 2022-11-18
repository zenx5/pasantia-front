export const pluginDownloadButton = {
    id: 'download_button_canvas',
    afterDraw: (chart, args, options) => {
        const {ctx, canvas} = chart;
        const x = 40
        const y = 40
        const width = 70
        const height = 30
        ctx.moveTo(x, y)
        ctx.rect( x, y, width, height)
        ctx.stroke()
        ctx.fillText("Download", x+10, y+height/2);
        canvas.addEventListener('mousemove', event => {
          const { target, offsetX, offsetY } = event
          if( offsetX > x && offsetX < x+width && offsetY > y && offsetY < y+height ){
            target.style.cursor = 'pointer'
          }else{
            target.style.cursor = 'default'
          }
        })
        canvas.addEventListener('click', event => {
          const { offsetX, offsetY } = event
          if( offsetX > x && offsetX < x+width && offsetY > y && offsetY < y+height ){        
            alert('la imagen se descargara en breve')
          }
        })
    }
  }