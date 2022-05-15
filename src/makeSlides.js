import PptxGenJS from "pptxgenjs";
import { titleSlideStyle, lyricSlideStyle } from './slidesStyles.js'


async function makeSlides(selectedSongs) {
    // get lyrics
    const selectedSongIds = [];
    selectedSongs.forEach(song => selectedSongIds.push(song.id))

    const response = await fetch("/lyrics?songs=" + selectedSongIds.toString());
    const selectedSongLyrics = await response.json();

    // DB pulls songs in id order
    // need to re-order according to user's selection
    const orderedSongLyrics = [];
    selectedSongIds.forEach(songId => {
        orderedSongLyrics.push(
            selectedSongLyrics.find(song => song.id === songId)
        )
    });

    // generate slides using pptxgenjs
    let pres = new PptxGenJS();

    orderedSongLyrics.forEach(songLyric => {
        // add song title
        pres.addSection({ title: songLyric.title})
        let slide = pres.addSlide({ sectionTitle: songLyric.title});
        slide.addText(songLyric.title, titleSlideStyle);

        // add song lyrics
        songLyric['lyrics'].forEach(lyric => {
            let slide = pres.addSlide({ sectionTitle: songLyric.title});
            slide.addText(lyric, lyricSlideStyle);
        })
    })

    // save the presentation
    await pres.writeFile({fileName: 'praiseio-worship-slides.pptx'});
}

export default makeSlides;