const imageExtension = (type) => {
    const imageExts = [
        {
            ext: 'jpg',
            mime: 'image/jpeg'
        },
        {
            ext: 'jpg',
            mime: 'image/jpg'
        },
        {
            ext: 'png',
            mime: 'image/png'
        },
        {
            ext: 'gif',
            mime: 'image/gif'
        }
    ];

    const extension = imageExts.filter((image) => {
        return type === image.mime;
    });

    if (!extension.length) return false;

    return extension[0].ext;
};


module.exports = imageExtension
