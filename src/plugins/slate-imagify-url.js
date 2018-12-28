import isUrl from 'is-url';

export default function PasteImagify(options = {}) {
  const { insertPastedImage = 'insertPastedImage' } = options;
  const allowedImageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

  return {
    onCommand(command, change, next) {
      const { type, args } = command;
      let url;
      if (
        (type === 'insertText' && isUrl((url = args[0]))) ||
        (type === 'insertFragment' && isUrl((url = args[0].text)))
      ) {
        const imgExtentionFromUrl = url
          .split('.')
          .pop()
          .toLowerCase();
        if (allowedImageTypes.indexOf(imgExtentionFromUrl) !== -1) {
          change.command(insertPastedImage, url).moveToEnd();
          return;
        }

        fetch(url)
          .then(({ headers }) => {
            const extension = headers
              .get('content-type')
              .split('/')
              .pop();
            if (extension && allowedImageTypes.indexOf(extension) !== -1) {
              change.command(insertPastedImage, url).moveToEnd();
              return;
            }
            next();
          })

          .catch(error => {
            console.log('error in imagify', error);
            next();
          });
        return;
      }

      next();
    }
  };
}
