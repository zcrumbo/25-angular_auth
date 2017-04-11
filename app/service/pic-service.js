'use strict';

module.exports = ['$log', '$q', '$http', 'Upload', 'authService', picService];

function picService($log, $q, $http, Upload, authService){
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('picService.uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'applciation/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      })
      .then( res => {
        galleryData.pics.unshift(res.data);
        return res.data;
      })
      .catch( err => {
        console.error(err);
        return $q.reject(err);
      });
    });
  };
  service.deleteGalleryPic = function(galleryData, picData) {
    $log.debug('picService.deleteGalleryPic');

    authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`;
      let config ={
        headers : {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      };
      $http.delete(url, config)
      .then( res => {
        $log.debug(galleryData.pics);
        galleryData.pics.forEach((pic, index) => {
          if (pic._id === picData._id) galleryData.pics.splice(index,1);
        });

      })
      .catch( err => {
        console.error(err);
        return $q.reject(err);
      });
    });
  };
  return service;
}

