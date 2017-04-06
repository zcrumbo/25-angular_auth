'use strict';

describe('Gallery Item Component', function(){
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  describe('galleryItemCtrl.delete()', () => {
    it('should  call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual('12345');
        }
      };

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteDone({galleryData: galleryItemCtrl.gallery});

      this.$rootScope.$apply();
    });

    it('should call deleteDone with gallery after galleryDelete', () => {
      let url = 'http://localhost:8000/api/gallery/12345';
      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json'
      };
      this.deleteDoneFired = false;
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: []
        },
        deleteDone: function(data){
          expect(data._id).toEqual(mockBindings.gallery._id);
        }
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);

      expect(galleryItemCtrl.deleteGallery()._id).toEqual(mockBindings.gallery._id);

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
  describe('galleryItemCtrl.editGallery', () => {
    it('should trigger the edit state', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: []
        }
      };
      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);

      galleryItemCtrl.editGallery();

      expect(galleryItemCtrl.showEditGallery).toEqual(true);
      expect(galleryItemCtrl.oldData).toEqual(mockBindings.gallery);
      this.$rootScope.$apply();
    });
  });
});
