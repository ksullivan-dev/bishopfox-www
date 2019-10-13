const getDefaults = fileType => {
  switch (fileType) {
    case 'image':
    case 'fileImage':
      return {
        headerIcon: 'image outline',
        headerText: 'No image added',
        id: 'fileUploadInput',
        accept: '.jpg,.jpeg,.png,image/*',
        uploadText: 'Upload Image',
        changeText: 'Change Image'
      };
    case 'csv':
      return {
        headerIcon: 'file excel outline',
        headerText: 'No .xls, .xlsx, .csv added',
        id: 'fileUploadInput',
        accept: '.xls,.xlsx,.csv',
        uploadText: 'Upload File',
        changeText: 'Change File'
      };
    default:
      return {
        headerIcon: 'file outline',
        headerText: 'No files added',
        id: 'fileUploadInput',
        uploadText: 'Upload File',
        changeText: 'Change File'
      };
  }
};

export default getDefaults;
