let imageSize
let slider
export function generateSlider(context) {
    const { imageCount } = context
    let sliderbox = document.getElementById("sliderBox")

    let prevButton = document.createElement("div")
    prevButton.className = "arrow prevArrow"
    prevButton.addEventListener("click", function () {
        changeImage(context, -1)
    })

    let prevImg = document.createElement("img")
    prevImg.src = "img/icons/arrow-left.png"
    prevButton.appendChild(prevImg)
    sliderbox.appendChild(prevButton)

    slider = document.createElement("div")
    slider.id = "slider"
    sliderbox.appendChild(slider)

    for (let i = 0; i < imageCount; i++) {
        let slide = document.createElement("img")
        slide.src = `img/${i}.jpg`
        slider.appendChild(slide)
    }
    let slide = document.createElement("img")
    slide.src = `img/0.jpg`
    slide.id = "slide1"
    slider.appendChild(slide)


    let nextButton = document.createElement("div")
    nextButton.className = "arrow nextArrow"
    nextButton.addEventListener("click", function () {
        changeImage(context, 1)
    })

    let nextImg = document.createElement("img")
    nextImg.src = "img/icons/arrow-right.png"
    nextButton.appendChild(nextImg)
    sliderbox.appendChild(nextButton)

}

function changeImage(context, direction) {
    let slide = document.getElementById("slide1")
    imageSize = slide.clientWidth
    const { imageCount } = context
    if (context.currentImage >= imageCount) {
        context.currentImage = 0
        slider.scrollTo({ left: 0 })
    } else if (context.currentImage + direction < 0) {
        context.currentImage = imageCount
        let offset = imageCount * imageSize
        slider.scrollTo({ left: offset })
    }
    context.currentImage += direction

    let offset = context.currentImage * imageSize
    slider.scrollTo({ left: offset, behavior: "smooth" })
    console.log(context.currentImage)
}