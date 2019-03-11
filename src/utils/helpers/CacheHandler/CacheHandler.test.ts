import CacheHandler from 'src/utils/helpers/CacheHandler';

describe('CacheHandler class', () => {
  describe('The extractUrlEndpoint function', () => {
    it('should return the endpoint without query parameters', () => {
      const address = '/assets?limit=10';

      expect(CacheHandler.extractUrlEndpoint(address, 'https://baseapi.url')).toBe('/assets');
    });

    it('should return the home route when the url passed is the base url', () => {
      const address = 'https://baseapi.url';

      expect(CacheHandler.extractUrlEndpoint(address, 'https://baseapi.url')).toBe('/');
    });

    it('should remove trailing forward slashes', () => {
      const address = '/asset-categories/';

      expect(CacheHandler.extractUrlEndpoint(address)).toBe('/asset-categories');
    });

    it('should add a leading forward slash to urls that don\'t have', () => {
      const address = 'asset-categories';

      expect(CacheHandler.extractUrlEndpoint(address)).toBe('/asset-categories');
    });

    it('should return null if the url supplied is invalid', () => {
      const address = '//';

      expect(CacheHandler.extractUrlEndpoint(address)).toBe(null);
    });
  });
});
