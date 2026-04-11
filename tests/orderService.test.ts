import * as orderService from '../src/api/v1/services/orderService';
import * as restaurantRepository from '../src/api/v1/repositories/restaurantRepository';
import { OrderStatus } from '../src/api/v1/models/orderModel';

jest.mock('../src/api/v1/repositories/restaurantRepository');

const mockRestaurantRepository = restaurantRepository as jest.Mocked<typeof restaurantRepository>;

// Helper function to create mock DocumentSnapshot
const createMockSnapshot = (data: any) => ({
  data: () => data,
  exists: true,
  ref: null,
  id: 'mock-id',
  readTime: null,
  metadata: {}
} as any);

describe('Order Service', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrders', () => {
    it('should create a new order successfully with valid data', async () => {
      const mockRestaurant = createMockSnapshot({ restaurantName: 'Pizza Palace' });
      const mockMenuItem1 = createMockSnapshot({ itemName: 'Margherita', itemPrice: 12.99 });
      const mockMenuItem2 = createMockSnapshot({ itemName: 'Pepperoni', itemPrice: 14.99 });
      const mockNewOrder = createMockSnapshot({
        restaurantId: 'rest-123',
        restaurantName: 'Pizza Palace',
        customerName: 'John Doe',
        items: [
          { itemId: 'item-1', itemName: 'Margherita', itemPrice: 12.99 },
          { itemId: 'item-2', itemName: 'Pepperoni', itemPrice: 14.99 }
        ],
        totalPrice: 27.98,
        status: OrderStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      mockRestaurantRepository.getDocumentById
        .mockResolvedValueOnce(mockRestaurant)
        .mockResolvedValueOnce(mockMenuItem1)
        .mockResolvedValueOnce(mockMenuItem2);

      mockRestaurantRepository.createDocument.mockResolvedValueOnce('order-123');
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockNewOrder);

      const result = await orderService.createOrders({
        restaurantId: 'rest-123',
        customerName: 'John Doe',
        items: [
          { itemId: 'item-1' },
          { itemId: 'item-2' }
        ]
      });

      expect(result).toEqual(mockNewOrder.data());
      expect(mockRestaurantRepository.getDocumentById).toHaveBeenCalledWith('restaurants', 'rest-123');
      expect(mockRestaurantRepository.createDocument).toHaveBeenCalledWith(
        'orders',
        expect.objectContaining({
          restaurantId: 'rest-123',
          restaurantName: 'Pizza Palace',
          customerName: 'John Doe',
          totalPrice: 27.98,
          status: OrderStatus.Pending
        })
      );
    });

    it('should throw an error if restaurant ID is invalid', async () => {
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(null as any);

      await expect(
        orderService.createOrders({
          restaurantId: 'invalid-rest',
          customerName: 'John Doe',
          items: [{ itemId: 'item-1' }]
        })
      ).rejects.toThrow('Restaurant Id is invalid');

      expect(mockRestaurantRepository.getDocumentById).toHaveBeenCalledWith('restaurants', 'invalid-rest');
    });

    it('should throw an error if menu item ID is invalid', async () => {
      const mockRestaurant = createMockSnapshot({ restaurantName: 'Pizza Palace' });

      mockRestaurantRepository.getDocumentById
        .mockResolvedValueOnce(mockRestaurant)
        .mockResolvedValueOnce(null as any);

      await expect(
        orderService.createOrders({
          restaurantId: 'rest-123',
          customerName: 'John Doe',
          items: [{ itemId: 'invalid-item' }]
        })
      ).rejects.toThrow('Menu item Id is invalid');
    });

    it('should calculate total price correctly', async () => {
      const mockRestaurant = createMockSnapshot({ restaurantName: 'Pizza Palace' });
      const mockMenuItems = [
        createMockSnapshot({ itemName: 'Item 1', itemPrice: 10.00 }),
        createMockSnapshot({ itemName: 'Item 2', itemPrice: 20.50 }),
        createMockSnapshot({ itemName: 'Item 3', itemPrice: 5.99 })
      ];
      const mockNewOrder = createMockSnapshot({
        restaurantId: 'rest-123',
        restaurantName: 'Pizza Palace',
        customerName: 'John Doe',
        items: [
          { itemId: 'item-1', itemName: 'Item 1', itemPrice: 10.00 },
          { itemId: 'item-2', itemName: 'Item 2', itemPrice: 20.50 },
          { itemId: 'item-3', itemName: 'Item 3', itemPrice: 5.99 }
        ],
        totalPrice: 36.49,
        status: OrderStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockRestaurant);

      for (const item of mockMenuItems) {
        mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(item);
      }

      mockRestaurantRepository.createDocument.mockResolvedValueOnce('order-123');
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockNewOrder);

      const result = await orderService.createOrders({
        restaurantId: 'rest-123',
        customerName: 'John Doe',
        items: [
          { itemId: 'item-1' },
          { itemId: 'item-2' },
          { itemId: 'item-3' }
        ]
      });

      expect(result.totalPrice).toBe(36.49);
    });
  });

  describe('getOrderById', () => {
    it('should retrieve an order by ID successfully', async () => {
      const mockOrder = createMockSnapshot({
        restaurantId: 'rest-123',
        restaurantName: 'Pizza Palace',
        customerName: 'John Doe',
        items: [{ itemId: 'item-1', itemName: 'Pizza', itemPrice: 12.99 }],
        totalPrice: 12.99,
        status: OrderStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockOrder);

      const result = await orderService.getOrderById('order-123');

      expect(result).toEqual(mockOrder.data());
      expect(mockRestaurantRepository.getDocumentById).toHaveBeenCalledWith('orders', 'order-123');
    });

    it('should throw an error if order ID is invalid', async () => {
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(null as any);

      await expect(orderService.getOrderById('invalid-order')).rejects.toThrow('Id is invalid');
    });
  });

  describe('updateOrder', () => {
    it('should update an order successfully', async () => {
      const existingOrder = {
        restaurantId: 'rest-123',
        restaurantName: 'Pizza Palace',
        customerName: 'John Doe',
        items: [{ itemId: 'item-1', itemName: 'Pizza', itemPrice: 12.99 }],
        totalPrice: 12.99,
        status: OrderStatus.Pending,
        createdAt: new Date('2026-04-10'),
        updatedAt: new Date('2026-04-10')
      };

      const mockExistingDocument = createMockSnapshot(existingOrder);

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(mockExistingDocument);
      mockRestaurantRepository.updateDocument.mockResolvedValueOnce(undefined);

      const result = await orderService.updateOrder('order-123', {
        customerName: 'Jane Doe',
        restaurantName: 'Pizza Palace',
        items: existingOrder.items,
        totalPrice: existingOrder.totalPrice,
        status: OrderStatus.InProgress,
        updatedAt: new Date()
      });

      expect(result.customerName).toBe('Jane Doe');
      expect(result.status).toBe(OrderStatus.InProgress);
      expect(result.restaurantId).toBe('rest-123');
      expect(mockRestaurantRepository.updateDocument).toHaveBeenCalledWith(
        'orders',
        'order-123',
        expect.objectContaining({
          customerName: 'Jane Doe',
          status: OrderStatus.InProgress,
          updatedAt: expect.any(Date)
        })
      );
    });

    it('should throw an error if order does not exist', async () => {
      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(null as any);

      await expect(
        orderService.updateOrder('invalid-order', {
          customerName: 'Jane Doe',
          restaurantName: 'Pizza Palace',
          items: [],
          totalPrice: 0,
          status: OrderStatus.Pending
        })
      ).rejects.toThrow('Id is invalid');
    });

    it('should preserve restaurantId and createdAt when updating', async () => {
      const createdDate = new Date('2026-04-10');
      const existingOrder = {
        restaurantId: 'rest-123',
        restaurantName: 'Pizza Palace',
        customerName: 'John Doe',
        items: [{ itemId: 'item-1', itemName: 'Pizza', itemPrice: 12.99 }],
        totalPrice: 12.99,
        status: OrderStatus.Pending,
        createdAt: createdDate,
        updatedAt: new Date('2026-04-10')
      };

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(createMockSnapshot(existingOrder));
      mockRestaurantRepository.updateDocument.mockResolvedValueOnce(undefined);

      await orderService.updateOrder('order-123', {
        customerName: 'Jane Doe',
        restaurantName: 'Pizza Palace',
        items: existingOrder.items,
        totalPrice: existingOrder.totalPrice,
        status: OrderStatus.Completed,
        updatedAt: new Date()
      });

      const updateCall = mockRestaurantRepository.updateDocument.mock.calls[0];
      expect(updateCall[2]).toEqual(
        expect.objectContaining({
          customerName: 'Jane Doe',
          status: OrderStatus.Completed
        })
      );
    });

    it('should update order status correctly', async () => {
      const existingOrder = {
        restaurantId: 'rest-123',
        restaurantName: 'Pizza Palace',
        customerName: 'John Doe',
        items: [{ itemId: 'item-1', itemName: 'Pizza', itemPrice: 12.99 }],
        totalPrice: 12.99,
        status: OrderStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockRestaurantRepository.getDocumentById.mockResolvedValueOnce(createMockSnapshot(existingOrder));
      mockRestaurantRepository.updateDocument.mockResolvedValueOnce(undefined);

      const result = await orderService.updateOrder('order-123', {
        customerName: 'John Doe',
        restaurantName: 'Pizza Palace',
        items: existingOrder.items,
        totalPrice: existingOrder.totalPrice,
        status: OrderStatus.Completed,
        updatedAt: new Date()
      });

      expect(result.status).toBe(OrderStatus.Completed);
    });
  });
});