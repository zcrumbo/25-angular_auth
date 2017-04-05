'use strict';

describe('Gallery Service Test', function() {

  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('galleryService.createGallery()', () => {
    it('should create a new gallery', () => {
      let galleryData = {
        name: 'example gallery',
        desc: 'example description'
      };

      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };

      this.$httpBackend.expectPOST('http://localhost:8000/api/gallery', galleryData, headers)
      .respond(200, {
        _id: '1234',
        username: 'testuser',
        name: galleryData.name,
        desc: galleryData.desc,
        pics: []
      });

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.updateGallery()', () => {
    it('should update an existing gallery', () => {
      let galleryData = {
        name: 'example updated gallery',
        desc: 'example updated description',
        _id: '12345'
      };

      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };

      this.$httpBackend.expectPUT('http://localhost:8000/api/gallery/12345', galleryData, headers)
      .respond(200, {
        _id: '12345',
        username: 'testuser',
        name: galleryData.name,
        desc: galleryData.desc,
        pics: []
      });

      this.galleryService.updateGallery(galleryData._id, galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.deleteGallery()', () => {
    it('should delete a gallery', () => {
      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json',
      };

      this.$httpBackend.expectDELETE('http://localhost:8000/api/gallery/1234', headers)
      .respond(204);

      this.galleryService.deleteGallery('1234');
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});