test('index', () => {
    const firstA = document.createElement('a');
    firstA.setAttribute('data-fslightbox', 'gallery-first');
    firstA.setAttribute('href', 'image/1.jpg');
    document.body.appendChild(firstA);

    const secondA = document.createElement('a');
    secondA.setAttribute('data-fslightbox', 'gallery-first');
    secondA.setAttribute('data-type', 'image');
    secondA.setAttribute('data-video-poster', 'img/video-poster.jpg');
    secondA.setAttribute('data-custom-class', 'example-class');
    secondA.setAttribute('href', '#custom-source-1');
    const customSourceFirst = document.createElement('div');
    customSourceFirst.id = 'custom-source-1';
    document.body.appendChild(customSourceFirst);
    document.body.appendChild(secondA);

    const thirdA = document.createElement('a');
    thirdA.setAttribute('data-fslightbox', 'gallery-second');
    thirdA.setAttribute('href', '#custom-source-2');
    const customSourceSecond = document.createElement('div');
    customSourceSecond.id = 'custom-source-2';
    document.body.appendChild(customSourceSecond);
    document.body.appendChild(thirdA);

    const fourthA = document.createElement('a');
    fourthA.setAttribute('data-fslightbox', 'gallery-first');
    fourthA.setAttribute('href', 'image/2.jpg');
    document.body.appendChild(fourthA);

    const fifthA = document.createElement('a');
    fifthA.setAttribute('data-fslightbox', 'gallery-second');
    fifthA.setAttribute('href', 'image/3.jpg');
    document.body.appendChild(fifthA);

    const sixA = document.createElement('a');
    sixA.setAttribute('href', 'image/4.jpg');
    document.body.appendChild(sixA);

    require('../src');

    expect(fsLightboxInstances['gallery-first'].props.sources).toEqual([
        'image/1.jpg', customSourceFirst, 'image/2.jpg'
    ]);
    expect(fsLightboxInstances['gallery-second'].props.sources).toEqual([
        customSourceSecond, 'image/3.jpg'
    ]);
    expect(fsLightboxInstances['gallery-first'].elements.a).toEqual([
        firstA, secondA, fourthA
    ]);
    expect(fsLightboxInstances['gallery-second'].elements.a).toEqual([
        thirdA, fifthA
    ]);
    expect(fsLightboxInstances['gallery-first'].props.types[1]).toBe('image');
    expect(fsLightboxInstances['gallery-first'].props.videosPosters[1]).toBe('img/video-poster.jpg');
    expect(fsLightboxInstances['gallery-first'].props.customClasses[1]).toBe('example-class');
    expect(fsLightboxInstances['gallery-first']).toBeInstanceOf(FsLightbox);
    expect(fsLightboxInstances['gallery-second']).toBeInstanceOf(FsLightbox);
    expect(fsLightbox).toBe(fsLightboxInstances['gallery-second']);

    fsLightboxInstances['gallery-first'].open = jest.fn();
    const event = new Event('click');
    event.preventDefault = jest.fn();
    fourthA.dispatchEvent(event);
    expect(event.preventDefault).toBeCalled();
    expect(fsLightboxInstances['gallery-first'].open).toBeCalledWith(2);

    // testing updating lightboxes - on opened one
    fsLightboxInstances['gallery-second'].open();
    thirdA.setAttribute('href', 'invalid-updated');
    const seventhA = document.createElement('a');
    seventhA.setAttribute('data-fslightbox', 'gallery-second');
    seventhA.setAttribute('href', 'image/5.jpg');
    document.body.appendChild(seventhA);
    // test adding new gallery
    const eighthA = document.createElement('a');
    eighthA.setAttribute('data-fslightbox', 'gallery-third');
    eighthA.setAttribute('href', 'image/6.jpg');
    document.body.appendChild(eighthA);

    fsLightboxInstances['gallery-second'].props.videosPosters = ['video poster should not be cleared'];
    refreshFsLightbox();
    expect(fsLightboxInstances['gallery-second'].props.sources).toEqual([
        'invalid-updated', 'image/3.jpg', 'image/5.jpg'
    ]);
    expect(fsLightboxInstances['gallery-second'].props.videosPosters).toEqual(['video poster should not be cleared']);
    expect(fsLightboxInstances['gallery-third'].props.sources).toEqual(['image/6.jpg']);
});
