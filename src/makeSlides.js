import pptxgen from "pptxgenjs";

function makeSlides(selectedSongs) {
    console.log(JSON.stringify(selectedSongs));
    const songLyrics = getSongLyrics(selectedSongs);

    // let pres = new pptxgen();

    songLyrics.forEach(songLyric => {
        // let slide = pptx.addSlide();

        // slide.addText()

    });

    // pptx.writeFile({ fileName: 'praiseio-worship-slides' });
}

function getSongLyrics() {

    return [];
}

export default makeSlides;