import * as menuService from '../src/api/v1/services/menuService';
import * as restaurantRepository from '../src/api/v1/repositories/restaurantRepository';

jest.mock('../src/api/v1/repositories/restaurantRepository');

const mockRestaurantRepository = restaurantRepository as jest.Mocked<typeof restaurantRepository>;

// Helper function to create mock DocumentSnapshot
const createMockSnapshot = (data: any, id: string = 'mock-id') => ({
  data: () => data,
  id,
  exists: true,
  ref: null,
  readTime: null,
  metadata: {}
} as any);

describe('Menu Service', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ====== createMenuItems Tests ======
  describe('createMenuItems', () => {
    it('should create a new menu item successfully', async () => {
      const newMenuItemData = {
        itemId: 'menu-1',
        restaurantId: 'rest-123',
        itemName: 'Margherita Pizza',
        itemDescription: 'Classic pizza with tomato and mozzarella',
        itemPrice: 12.99,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockSnapshot = createMockSnapshot(newMenuItemData, 'menu-1');

      mockRestaurantRepository.createDocument.mockResolvedValueOnce('menu-1');
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);

      const result = await menuService.createMenuItems({
        restaurantId: 'rest-123',
        itemName: 'Margherita Pizza',
        itemDescription: 'Classic pizza with tomato and mozzarella',
        itemPrice: 12.99
      });

      expect(result).toEqual({
        itemId: 'menu-1',
        restaurantId: 'rest-123',
        itemName: 'Margherita Pizza',
        itemDescription: 'Classic pizza with tomato and mozzarella',
        itemPrice: 12.99,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });

      expect(mockRestaurantRepository.createDocument).toHaveBeenCalledWith(
        'menuItems',
        expect.objectContaining({
          restaurantId: 'rest-123',
          itemName: 'Margherita Pizza',
          itemDescription: 'Classic pizza with tomato and mozzarella',
          itemPrice: 12.99
        })
      );

      expect(mockRestaurantRepository.getDocumentById).toHaveBeenCalledWith('menuItems', 'menu-1');
    });

    it('should create menu item with correct timestamps', async () => {
      const now = new Date();
      const newMenuItemData = {
        itemId: 'menu-2',
        restaurantId: 'rest-456',
        itemName: 'Caesar Salad',
        itemDescription: 'Fresh caesar salad',
        itemPrice: 9.99,
        createdAt: now,
        updatedAt: now
      };

      const mockSnapshot = createMockSnapshot(newMenuItemData, 'menu-2');

      mockRestaurantRepository.createDocument.mockResolvedValueOnce('menu-2');
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);

      const result = await menuService.createMenuItems({
        restaurantId: 'rest-456',
        itemName: 'Caesar Salad',
        itemDescription: 'Fresh caesar salad',
        itemPrice: 9.99
      });

      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
      expect(result.itemPrice).toBe(9.99);
    });
  });

  // ====== getAllMenuItems Tests ======
  describe('getAllMenuItems', () => {
    it('should retrieve all menu items for a specific restaurant', async () => {
      const mockDocs = [
        {
          id: 'menu-1',
          data: () => ({
            restaurantId: 'rest-123',
            itemName: 'Pizza',
            itemDescription: 'Cheese pizza',
            itemPrice: 10.99,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        },
        {
          id: 'menu-2',
          data: () => ({
            restaurantId: 'rest-123',
            itemName: 'Pasta',
            itemDescription: 'Spaghetti',
            itemPrice: 12.99,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        },
        {
          id: 'menu-3',
          data: () => ({
            restaurantId: 'rest-456',
            itemName: 'Burger',
            itemDescription: 'Beef burger',
            itemPrice: 8.99,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      ];

      mockRestaurantRepository.getDocuments.mockResolvedValueOnce({
        docs: mockDocs
      } as any);

      const result = await menuService.getAllMenuItems('rest-123');

      expect(result).toHaveLength(2);
      expect(result[0].itemName).toBe('Pizza');
      expect(result[1].itemName).toBe('Pasta');
      expect(result.every(item => item.restaurantId === 'rest-123')).toBe(true);
    });

    it('should return empty array when no menu items exist for restaurant', async () => {
      mockRestaurantRepository.getDocuments.mockResolvedValueOnce({
        docs: []
      } as any);

      const result = await menuService.getAllMenuItems('rest-999');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should filter menu items by restaurantId correctly', async () => {
      const mockDocs = [
        {
          id: 'menu-1',
          data: () => ({
            restaurantId: 'rest-123',
            itemName: 'Item 1',
            itemDescription: 'Description 1',
            itemPrice: 10.00,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        },
        {
          id: 'menu-2',
          data: () => ({
            restaurantId: 'rest-456',
            itemName: 'Item 2',
            itemDescription: 'Description 2',
            itemPrice: 15.00,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      ];

      mockRestaurantRepository.getDocuments.mockResolvedValueOnce({
        docs: mockDocs
      } as any);

      const result = await menuService.getAllMenuItems('rest-123');

      expect(result).toHaveLength(1);
      expect(result[0].itemId).toBe('menu-1');
      expect(result[0].restaurantId).toBe('rest-123');
    });
  });

  // ====== getMenuItemById Tests ======
  describe('getMenuItemById', () => {
    it('should retrieve a menu item by ID successfully', async () => {
      const mockMenuItemData = {
        restaurantId: 'rest-123',
        itemName: 'Margherita Pizza',
        itemDescription: 'Classic pizza',
        itemPrice: 12.99,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockSnapshot = createMockSnapshot(mockMenuItemData, 'menu-123');

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);

      const result = await menuService.getMenuItemById('menu-123');

      expect(result).toEqual({
        itemId: 'menu-123',
        restaurantId: 'rest-123',
        itemName: 'Margherita Pizza',
        itemDescription: 'Classic pizza',
        itemPrice: 12.99,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });
    });

    it('should throw an error if menu item ID is invalid', async () => {
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(null);

      await expect(menuService.getMenuItemById('invalid-id')).rejects.toThrow('Id is invalid');
    });

    it('should include itemId from document ID', async () => {
      const mockMenuItemData = {
        restaurantId: 'rest-123',
        itemName: 'Pasta',
        itemDescription: 'Spaghetti',
        itemPrice: 11.99,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockSnapshot = createMockSnapshot(mockMenuItemData, 'specific-menu-id');

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);

      const result = await menuService.getMenuItemById('specific-menu-id');

      expect(result?.itemId).toBe('specific-menu-id');
    });
  });

  // ====== updateMenuItem Tests ======
  describe('updateMenuItem', () => {
    it('should update a menu item successfully', async () => {
      const existingMenuItem = {
        restaurantId: 'rest-123',
        itemName: 'Pizza',
        itemDescription: 'Cheese pizza',
        itemPrice: 10.99,
        createdAt: new Date('2026-04-01'),
        updatedAt: new Date('2026-04-01')
      };

      const mockSnapshot = createMockSnapshot(existingMenuItem, 'menu-123');

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);
      mockRestaurantRepository.updateDocument.mockResolvedValueOnce(undefined);

      const result = await menuService.updateMenuItem('menu-123', {
        restaurantId: 'rest-123',
        itemName: 'Pepperoni Pizza',
        itemDescription: 'Pizza with pepperoni',
        itemPrice: 13.99,
        updatedAt: new Date()
      });

      expect(result.itemName).toBe('Pepperoni Pizza');
      expect(result.itemDescription).toBe('Pizza with pepperoni');
      expect(result.itemPrice).toBe(13.99);
      expect(result.restaurantId).toBe('rest-123');
    });

    it('should preserve createdAt when updating', async () => {
      const createdDate = new Date('2026-04-01');
      const existingMenuItem = {
        restaurantId: 'rest-123',
        itemName: 'Pizza',
        itemDescription: 'Cheese pizza',
        itemPrice: 10.99,
        createdAt: createdDate,
        updatedAt: new Date('2026-04-01')
      };

      const mockSnapshot = createMockSnapshot(existingMenuItem, 'menu-123');

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);
      mockRestaurantRepository.updateDocument.mockResolvedValueOnce(undefined);

      const result = await menuService.updateMenuItem('menu-123', {
        restaurantId: 'rest-123',
        itemName: 'Updated Pizza',
        itemDescription: 'Updated description',
        itemPrice: 14.99,
        updatedAt: new Date()
      });

      expect(result.createdAt).toEqual(createdDate);
    });

    it('should throw an error if menu item does not exist', async () => {
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(null);

      await expect(
        menuService.updateMenuItem('invalid-id', {
          restaurantId: 'rest-123',
          itemName: 'Pizza',
          itemDescription: 'description',
          itemPrice: 12.99,
          updatedAt: new Date()
        })
      ).rejects.toThrow('Id is invalid');
    });

    it('should update only specified fields', async () => {
      const existingMenuItem = {
        restaurantId: 'rest-123',
        itemName: 'Pizza',
        itemDescription: 'Cheese pizza',
        itemPrice: 10.99,
        createdAt: new Date('2026-04-01'),
        updatedAt: new Date('2026-04-01')
      };

      const mockSnapshot = createMockSnapshot(existingMenuItem, 'menu-123');

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);
      mockRestaurantRepository.updateDocument.mockResolvedValueOnce(undefined);

      const result = await menuService.updateMenuItem('menu-123', {
        restaurantId: 'rest-123',
        itemName: 'New Name',
        itemDescription: 'Cheese pizza',
        itemPrice: 10.99,
        updatedAt: new Date()
      });

      expect(result.itemName).toBe('New Name');
      expect(result.restaurantId).toBe('rest-123');
    });
  });

  // ====== deleteMenuItem Tests ======
  describe('deleteMenuItem', () => {
    it('should delete a menu item successfully', async () => {
      const mockMenuItemData = {
        restaurantId: 'rest-123',
        itemName: 'Pizza',
        itemDescription: 'Cheese pizza',
        itemPrice: 10.99,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockSnapshot = createMockSnapshot(mockMenuItemData, 'menu-123');

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);
      mockRestaurantRepository.deleteDocument.mockResolvedValueOnce(undefined);

      await menuService.deleteMenuItem('menu-123');

      expect(mockRestaurantRepository.deleteDocument).toHaveBeenCalledWith('menuItems', 'menu-123');
    });

    it('should throw an error if menu item does not exist', async () => {
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(null);

      await expect(menuService.deleteMenuItem('invalid-id')).rejects.toThrow('Id is invalid');
    });

    it('should verify menu item exists before deletion', async () => {
      const mockMenuItemData = {
        restaurantId: 'rest-123',
        itemName: 'Pizza',
        itemDescription: 'Cheese pizza',
        itemPrice: 10.99,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockSnapshot = createMockSnapshot(mockMenuItemData, 'menu-to-delete');

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockSnapshot);
      mockRestaurantRepository.deleteDocument.mockResolvedValueOnce(undefined);

      await menuService.deleteMenuItem('menu-to-delete');

      expect(mockRestaurantRepository.getDocumentById).toHaveBeenCalledWith('menuItems', 'menu-to-delete');
      expect(mockRestaurantRepository.deleteDocument).toHaveBeenCalledWith('menuItems', 'menu-to-delete');
    });
  });
});